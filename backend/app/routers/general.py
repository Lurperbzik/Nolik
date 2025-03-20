from fastapi import APIRouter, Query, HTTPException

from app.models.embeddings import RepositoryIssues, RepositoryIssuesWithEmbeddings
from app.config.settings import GITHUB_TOKEN

from modules.api_clients.adapter import ApiClient
from modules.embeddings.embedding_utils import embedding_instance
from modules.milvus.milvus_client import milvus_client

extractor = ApiClient("github", GITHUB_TOKEN)

router = APIRouter(prefix="/api/general", tags=["General"])

@router.post("/fetch/issues")
async def fetch_issues(
    owner: str = Query("danielmiessler", description="Owner del repositorio"),
    repo: str = Query("SecLists", description="Nombre del repositorio")):

    try: 
        data = await extractor.fetch_issues(owner, repo)
        data_with_embeddings = await embedding_instance.generate_embeddings_from_repository(RepositoryIssues.model_validate(data))
        result = milvus_client.create_collection(data_with_embeddings.url)
        if result.status == 200:
            result = milvus_client.insert_data_into_collection(data_with_embeddings.url, RepositoryIssuesWithEmbeddings.model_validate(data_with_embeddings))
        
        if result.status == 200:
            return result.message
        else:
            raise HTTPException(status_code=result.status, detail=result.message)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
