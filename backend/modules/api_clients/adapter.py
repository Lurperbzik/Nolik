from fastapi import HTTPException
from modules.api_clients.github_client.github_client import GithubClient
from modules.api_clients.model import Client, ClientException, RepositoryIssues

class ApiClient:
    def __init__(self, client: str, token: str):
        try: 
            self.client = Client(name=client)
        except ValueError:
            raise HTTPException(status_code=400, detail="Input should be 'github' or 'jira'")
        
        self.token = token
    
    async def fetch_issues(self, owner, repo) -> RepositoryIssues:
        if self.client.name == "github":
            try:
                data = await GithubClient(token=self.token, owner=owner, repo=repo).fetch_repo_data()
                RepositoryIssues.model_validate(data)
                return data
            
            except ClientException as e:
                raise HTTPException(status_code=e.status_code, detail=str(e))
            except Exception:
                raise HTTPException(status_code=500, detail="Internal server error")
            
        else:
            raise HTTPException(status_code=400, detail="Client not supported")



