from fastapi import APIRouter, HTTPException
from modules.api_clients.adapter import ApiClient
from app.config.settings import GITHUB_TOKEN

router = APIRouter(prefix="/api/github", tags=["Github"])

@router.get("/exists")
async def check_repo_exists(repo_owner: str, repo_name: str):
    try:
        response = await ApiClient("github", GITHUB_TOKEN).exists(repo_owner, repo_name)
        return response
    except HTTPException as e:
        raise e 
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")