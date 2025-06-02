import urllib.parse

from fastapi import APIRouter, HTTPException 

from app.api.websocket.web_socket import send_message_wb
from app.api.models.schemas import SearchSchema, CollectionUrlSchema, CollectionSchema, AdvancedSearchSchema
from app.api.routers.github_router import check_repo_exists

from app.modules.models.response_model import ClientException
from app.modules.milvus.milvus_client import MilvusConn
from app.modules.embeddings.embedding_utils import embedding_instance
from app.modules.api_clients.adapter import ApiClient

router = APIRouter(prefix="/api", tags=["API"])


@router.get("/collections")
async def get_collections():
    """
    Get all collections.
    """
    try:
        milvus_client = MilvusConn()
        return milvus_client.get_collections()
    
    except ClientException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Unknown Error")
    
@router.delete("/collections")
async def delete_collection(collection_url: CollectionUrlSchema):
    """
    Delete a collection
    """
    collection_url = urllib.parse.unquote(collection_url.url)
    
    try:
        milvus_client = MilvusConn()
        milvus_client.delete_collection(collection_url)
        collections = await get_collections()
        await send_message_wb(collections)
        return {"message": "Collection deleted successfully"}
    
    except ClientException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Unknown Error")
    
@router.post("/issue-similarity")
async def get_issue_similarity(search: SearchSchema, limit: int = 5):
    """
    Get similar issues from a collection.
    """
    collection_url = urllib.parse.unquote(search.collection_url)
    
    try:
        milvus_client = MilvusConn()
        embedding = await embedding_instance.from_issue(search.issue)
        similar_issues = milvus_client.search_data(
            collection_url=collection_url,
            query_embedding=embedding,
            limit=limit
        )
        return similar_issues
    
    except ClientException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Unknown Error")
    
@router.post("/advanced-issue-similarity")
async def get_advanced_issue_similarity(data: AdvancedSearchSchema):
    """
    Get similar issues from a collection with advanced search.
    """
    collection_url = urllib.parse.unquote(data.collection_url)

    try:
        milvus_client = MilvusConn()
        embedding = await embedding_instance.from_issue(data.issue)
        similar_issues = milvus_client.advanced_search(
            collection_url=collection_url,
            query_embedding=embedding,
            limit=data.limit,
            required_words=data.required_words,
            accepted_deviation=data.accepted_deviation,
            min_num_comments=data.min_num_comments,
            state=data.state
        )
        return similar_issues
    except ClientException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/collection")
async def create_collection(collection_scheme: CollectionSchema):
    """
    Create a collection
    """
    if collection_scheme.platform != "GitHub":
        raise HTTPException(status_code=400, detail="Platform not supported")
    
    collection_scheme.url = urllib.parse.unquote(collection_scheme.url)
   

    try:
        await check_repo_exists(collection_scheme.owner, collection_scheme.name, collection_scheme.api_key)
        milvus_client = MilvusConn()
        milvus_client.create_collection(collection_scheme)
        collections = milvus_client.get_collections()
        await send_message_wb(collections)

        extractor = ApiClient(collection_scheme.platform, collection_scheme.api_key)
        
        collection = await extractor.fetch(collection_scheme.owner, collection_scheme.name)
        embedded_collection = await embedding_instance.from_collection(collection)
        milvus_client.insert_data(embedded_collection)

        collections = milvus_client.get_collections()
        await send_message_wb(collections)
        return {"message": "Collection created successfully"}
    
    except ClientException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    
    except HTTPException as e:
        raise 
    except Exception as e:
        raise HTTPException(status_code=500, detail="Unknown Error")
    