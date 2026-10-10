from fastapi import APIRouter, HTTPException

from app.modules.api_clients.adapter import ApiClient
from app.modules.milvus.milvus_client import MilvusConn
from app.modules.models.response_model import ClientException

router = APIRouter(prefix="/api/github", tags=["GitHub"])

@router.get("/exists")
async def check_repo_exists(repo_owner: str, repo_name: str, api_key: str):
    """
    Check if a GitHub repository exists.
    """
    try:
        exists = await ApiClient("GitHub", api_key).exists(repo_owner, repo_name)
        if not exists:
            raise HTTPException(status_code=404, detail="Repository not found")
        
        url = f"https://api.github.com/repos/{repo_owner}/{repo_name}"
        milvus_client = MilvusConn()

        if milvus_client.has_collection(url):
            raise HTTPException(status_code=400, detail="Collection already exists in Milvus")
        
        return url 
    
    except ClientException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error checking repository: {str(e)}")