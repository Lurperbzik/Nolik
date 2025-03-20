from pymilvus import (
    MilvusClient,
    DataType,
    FieldSchema,
    CollectionSchema,
)
import json 
from app.models.embeddings import RepositoryIssuesWithEmbeddings
from app.models.milvus_db import encode_Base64, decode_Base64
from modules.milvus.response_model import MilvusResponse

MAX_METADATA_SIZE = 65536 # used by milvus

class MilvusConn:
    def __init__(self, uri: str = "http://milvus-standalone:19530", user: str = "root", password: str = "Milvus"):
        self.client = MilvusClient(uri, user=user, password=password)
    
  
    def get_collections(self) -> MilvusResponse:
        """
        Get all collections from current user.

        Returns:
            list: List of collections
        """
        try: 
            collections = self.client.list_collections()
            data = []
            for collection in collections:
                data.append(decode_Base64(collection))
   
            return MilvusResponse.success(data, "Collections fetched successfully")
    
        except Exception as e:
            return MilvusResponse.exception

    def create_collection(self, name: str, description:str = "") -> MilvusResponse:
        """
        Create a collection with a given name.

        Args:
            name(str): name of the repository
            description(str): Description of the collection
        Returns:
            None
        """
        try:
            name = encode_Base64(name)
            collections = self.client.list_collections()
            if name in collections:
                return MilvusResponse.already_exists()
            
            fields = [
                FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
                FieldSchema(name="metadata", dtype=DataType.JSON),
                FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=384)
            ]
            schema = CollectionSchema(fields, description=description)
            self.client.create_collection(collection_name=name, schema=schema)
            index_params = self.client.prepare_index_params()
            index_params.add_index(
                field_name="embedding", 
                index_type="IVF_FLAT",
                metric_type="L2",
                params={"nlist": 1024}
            )
            
            self.client.create_index(name, index_params=index_params)
            return MilvusResponse.success(None, "Collection created successfully")
        
        except Exception as e:
            return MilvusResponse.exception_error(e)

    
    def fetch_data_from_collection(self, collection_name:str, embedding: list, limit: int = 5, output_fields: list[str] = ["metadata"], filter:str = "") -> MilvusResponse:
        """
        Fetch data from a collection.

        Args:
            collection_name(str): Name of the collection
            embedding(list): Embedding to search for
            limit(int): Limit of results
            output_fields(list[str]): Fields to output
            filter(str): Filter to apply
        
        Returns:
            dict: Response from the server
        """
        try: 
            collection_name = encode_Base64(collection_name)
            collections = self.client.list_collections()
            if collection_name not in collections:
                return MilvusResponse.not_found()

            
            self.client.load_collection(collection_name)

            response = self.client.search(
                collection_name=collection_name,
                data=[embedding],
                limit=limit,
                output_fields=output_fields,
                filter=filter
            )
            
            json_data = []
            for sublist in response:
                for issue in sublist:
                    json_data.append({
                        "distance": issue.get("distance"),
                        "issue": json.loads(issue.get("entity").get("metadata"))
                    })
            
            return MilvusResponse.success(json_data, "Data fetched successfully")
        except Exception as e:
            return MilvusResponse.exception_error(e)
        
    def insert_data_into_collection(self, collection_name: str, repo: RepositoryIssuesWithEmbeddings) -> MilvusResponse:
        """
        Insert data into a collection.

        Args:
            collection_name(str): Name of the collection
            issues(RepositoryIssuesWithEmbeddings): Issues to insert
        
        Returns:
            None
        """
        try: 
            collection_name = encode_Base64(collection_name)
            collections = self.client.list_collections()
            if collection_name not in collections:
                return MilvusResponse.not_found()
            
            data = []
            for issue in repo.issues:
                metadata_json = json.dumps(issue.issue.model_dump())
                metadata_size = len(metadata_json.encode('utf-8'))

                if metadata_size > MAX_METADATA_SIZE:
                    continue # skip this issue
                
                data.append({
                    "embedding": issue.embedding,
                    "metadata": metadata_json
                })
            self.client.load_collection(collection_name)
            self.client.insert(collection_name=collection_name, data=data)
            self.client.flush(collection_name)
            return MilvusResponse.success(None, "Data inserted successfully")
        
        except Exception as e:
            return MilvusResponse.exception_error(e)

    def get_all_data_from_collection(self, collection_name: str) -> MilvusResponse:
        """
        Get all data from a collection.

        Args:
            collection_name(str): Name of the collection
        
        Returns:
            dict: Response from the server
        """
        try:
            collection_name = encode_Base64(collection_name)
            collections = self.client.list_collections()
            if collection_name not in collections:
                return MilvusResponse.not_found()
            
            self.client.load_collection(collection_name)
            num_entities = self.client.get_collection_stats(collection_name).get('row_count')
            if num_entities == 0:
                return MilvusResponse.success(None, "No data in collection")

            data = self.client.query(collection_name=collection_name, output_fields=["metadata"], limit=num_entities)
            json_data = []
            for entity in data:
                json_data.append(json.loads(entity.get("metadata")))
            
            return MilvusResponse.success(json_data, "Data fetched successfully")
        
        except Exception as e:
            return MilvusResponse.exception_error(e)

    def delete_collection(self, collection_name: str) -> MilvusResponse:
        """
        Delete a collection.

        Args:
            collection_name(str): Name of the collection
        """
        try: 
            collection_name = encode_Base64(collection_name)
            collections = self.client.list_collections()
            if collection_name not in collections:
                return MilvusResponse.not_found()
            
            self.client.drop_collection(collection_name)
            return MilvusResponse.success(None, "Collection deleted successfully")
        except Exception as e:
            return MilvusResponse.exception_error(e)
        
milvus_client = MilvusConn()