import json, base64
from pymilvus import (
    MilvusClient,
    DataType,
    FieldSchema,
    CollectionSchema
)
from app.models.singleton import singleton
from app.models.collection import Collection, EmbeddedCollection

from app.modules.models.response_model import ClientException 

MAX_METADATA_SIZE = 65536

@singleton
class MilvusConn:
    def __init__(self, uri: str = "http://milvus-standalone:19530", user: str = "root", password: str = "Milvus"):
        self.client = MilvusClient(uri, user=user, password=password)

    def encode_Base64(self, collection_url: str) -> str:
        """
        Encode a collection URL to a base64 string.
        Args:
            collection_url (str): The name of the collection to encode.
        Returns:
            str: The base64 encoded collection URL.
        """
        encoded = base64.urlsafe_b64encode(collection_url.encode()).decode() 
        return encoded.replace("=", "_")  
    
    
    def decode_Base64(self, collection_url: str) -> str:
        """
        Decode a base64 string to a collection URL.
        Args:
            collection_url (str): The base64 encoded collection URL.
        Returns:
            str: The decoded collection URL.
        """
        padded = collection_url.replace("_", "=")
        return base64.urlsafe_b64decode(padded.encode()).decode()
    
    def has_collection(self, collection_url: str) -> bool:
        """
        Check if a collection
          exists in Milvus.

        Args:
            collection_url (str): The name of the collection to check.
        Returns:
            bool: True if the collection exists, False otherwise.
        """
        try:
            collection_name = self.encode_Base64(collection_url)
            return self.client.has_collection(collection_name)
        except Exception as e:
            raise ClientException(f"Error checking collection: {str(e)}", 500)
    
    def get_collections(self) -> list:
        """
        Get all collections in Milvus.

        Args:
            None
        Returns:
            list: A list of collection names.
        """
        try:
            collections = self.client.list_collections()
            json_results = []

            for collection in collections:
                collection_description = self.client.describe_collection(collection)
                json_results.append(collection_description["properties"])

            return json_results
        
        except Exception as e:
            raise ClientException(f"Error getting collections: {str(e)}", 500)
        
    def create_collection(self, collection: Collection) -> None:
        """
        Create a collection in Milvus.

        Args:
            collection (Collection): The collection to create without issues required.
        Returns:
            None
        """

        if self.has_collection(collection.url):
            raise ClientException(f"Collection already exists.", 400)
        
        collection_name = self.encode_Base64(collection.url)

        try:
            fields = [
                FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
                FieldSchema(name="metadata", dtype=DataType.JSON),
                FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=384),
                FieldSchema(name="num_comments", dtype=DataType.INT64),
                FieldSchema(name="state", dtype=DataType.VARCHAR, max_length=50),
            ]

            schema = CollectionSchema(fields=fields)
            self.client.create_collection(
                collection_name=collection_name, 
                schema=schema
            )

            index_params = self.client.prepare_index_params()
            index_params.add_index(
                field_name="embedding",
                index_type="IVF_FLAT",
                metric_type="L2",
                params={"nlist": 1024}
            )
            self.client.create_index(
                collection_name=collection_name,
                index_params=index_params
            )
            self.client.alter_collection_properties(
                collection_name=collection_name,
                properties={
                    "url": collection.url,
                    "name": collection.name,
                    "owner": collection.owner,
                    "platform": collection.platform,
                    "status": "loading"
                }
            )
            self.client.flush(collection_name=collection_name)
            return 
        except Exception as e:
            raise ClientException(f"Error creating collection: {str(e)}", 500)
        
    def delete_collection(self, collection_url: str) -> None:
        """
        Delete a collection in Milvus.

        Args:
            collection_url (str): The name of the collection to delete.
        
        Returns:
            None
        """
        if not self.has_collection(collection_url):
            raise ClientException(f"Collection does not exist.", 404)
        
        collection_name = self.encode_Base64(collection_url)
        
        try:
            self.client.drop_collection(collection_name)
            return 
        except Exception as e:
            raise ClientException(f"Error deleting collection: {str(e)}", 500)


    def insert_data(self, collection: EmbeddedCollection) -> None:
        """
        Insert data into a collection in Milvus.

        Args:
            collection (EmbeddedCollection): The collection to insert data into.
        
        Returns:
            None
        """
        if not self.has_collection(collection.url):
            raise ClientException(f"Collection does not exist.", 404)
        
        collection_name = self.encode_Base64(collection.url)
        json_data = []
        for item in collection.embedded_issues:
            item_json = json.dumps(item.issue.model_dump())
            item_size = len(item_json.encode('utf-8'))
            
            if item_size > MAX_METADATA_SIZE:
                continue # skip this item 

            json_data.append({
                "embedding": item.embedding,
                "metadata": item_json,
                "num_comments": len(item.issue.comments),
                "state": item.issue.state.lower()
            })
        
        try:
            self.client.load_collection(collection_name)
            self.client.insert(
                collection_name=collection_name,
                data=json_data
            )
            self.client.alter_collection_properties(
                collection_name=collection_name,
                 properties={
                    "url": collection.url,
                    "name": collection.name,
                    "owner": collection.owner,
                    "platform": collection.platform,
                    "status": "completed"
                }
            )
            self.client.flush(collection_name=collection_name)
            return 
        
        except Exception as e:
            raise ClientException(f"Error inserting data: {str(e)}", 500)
        
    def advanced_search(self, collection_url: str, query_embedding: list, limit: int, required_words: dict, accepted_deviation: float, min_num_comments: int, state: str) -> list:
        """
        Search for data in a collection in Milvus using advanced search options.
        
        Args:
            collection_url (str): The name of the collection to search.
            query_embedding (list): The embedding to search for.
            limit (int): The maximum number of results to return.
            required_words (dict): The required words to filter the search results.
            accepted_deviation (float): The accepted deviation for the search.
            min_num_comments (int): The minimum number of comments to filter the search results.
            state (str): The state of the issues to filter the search results.

        Returns:
            list: A list of results matching the query.
        
        Raises:
            ClientException: If the collection does not exist or if there is an error searching the data.
        """

        filter_expresion = "num_comments >= " + str(min_num_comments) + " and ("
        flag = False
        for word in required_words:
            flag = True
            filter_expresion += f"metadata like '%{word}%' or "

        if flag:
            filter_expresion = filter_expresion[:-4]  # Remove the last " or "
            filter_expresion += ")"
        else:
            filter_expresion = "num_comments >= " + str(min_num_comments)
        
        if state != "all":
            filter_expresion += f" and state like '{state.lower()}'"

        output_fields = ["metadata"]
        if not self.has_collection(collection_url):
            raise ClientException(f"Collection does not exist.", 404)
        
        collection_name = self.encode_Base64(collection_url)

        try:
            self.client.load_collection(collection_name)
            results = self.client.search(
                collection_name=collection_name,
                data=[query_embedding],
                limit=limit,
                output_fields=output_fields,
                filter=filter_expresion,
                search_params={
                    "params": {
                        "radius": accepted_deviation,
                        "range_filter": 0        
                    }
                }
            )

            json_results = []
            for sublist in results:
                for item in sublist:
                    json_results.append({
                        "distance": item.get("distance"),
                        "issue": json.loads(item.get("entity").get("metadata"))
                    })

            return json_results
        
        except ClientException as e:
            raise ClientException(f"Error searching data: {str(e)}", 500)
        
        except Exception as e:
           raise ClientException(f"Error searching data: {str(e)}", 500)
        
    def search_data(self, collection_url: str, query_embedding: list, limit: int = 5) -> list:
        """
        Search for data in a collection in Milvus.
        Args:
            collection_url (str): The name of the collection to search.
            query_embedding (list): The embedding to search for.
            limit (int): The maximum number of results to return.
        
        Returns:
            list: A list of results matching the query.
        """
        output_fields = ["metadata"]

        if not self.has_collection(collection_url):
            raise ClientException(f"Collection does not exist.", 404)
    
        collection_name = self.encode_Base64(collection_url)

        try:
            self.client.load_collection(collection_name)
            results = self.client.search(
                collection_name=collection_name,
                data=[query_embedding],
                limit=limit,
                output_fields=output_fields,
            )

            json_results = []
            for sublist in results:
                for item in sublist:
                    json_results.append({
                        "distance": item.get("distance"),
                        "issue": json.loads(item.get("entity").get("metadata"))
                    })

            return json_results
        
        except Exception as e:
            raise ClientException(f"Error searching data: {str(e)}", 500)