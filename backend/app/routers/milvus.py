import urllib.parse

from fastapi import APIRouter, HTTPException
from modules.milvus.milvus_client import milvus_client
from modules.embeddings.embedding_utils import embedding_instance
from app.models.milvus_db import IssueSchema, RepoUrlSchema
from modules.api_clients.github_client.github_utils import parse_github_url

router = APIRouter(prefix="/api/milvus", tags=["Milvus"])

@router.get("/collections")
async def get_collections():
    response = milvus_client.get_collections()
    if response.status == 200:
        json_data = []
        for collection in response.data:
            json_data.append(
                parse_github_url(collection)
            )
        return json_data
    else:
        raise HTTPException(status_code=response.status, detail=response.message)

@router.post("/collections/data")
async def get_all_data_by_collection(collection_url: RepoUrlSchema):
    collection_url = urllib.parse.unquote(collection_url.url)
    response = milvus_client.get_all_data_from_collection(collection_url)
    if response.status == 200:
        return response.data
    else:
        raise HTTPException(status_code=response.status, detail=response.message)

@router.post("/collections/issue-similarity")
async def fetch_data(collection_url: RepoUrlSchema, issue_title: IssueSchema, limit: int = 5):
    collection_url = urllib.parse.unquote(collection_url.url)
    embedding = await embedding_instance.generate_embedding_from_issue(issue_title.body)
    response = milvus_client.fetch_data_from_collection(collection_url, embedding, limit)
    if response.status == 200:
        return response.data
    else:
        raise HTTPException(status_code=response.status, detail=response.message)

@router.delete("/collections")
async def delete_collection(collection_url: RepoUrlSchema):
    collection_url = urllib.parse.unquote(collection_url.url)
    response = milvus_client.delete_collection(collection_url)
    if response.status == 200:
        return response.message
    else:
        raise HTTPException(status_code=response.status, detail=response.message)
