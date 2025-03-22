from fastapi import HTTPException
from modules.api_clients.github_client.github_client import GithubClient
from modules.api_clients.model import Client, ClientException, RepositoryIssues
from modules.milvus.milvus_client import milvus_client

class ApiClient:
    def __init__(self, client: str, token: str):
        try: 
            self.client = Client(name=client)
        except ValueError:
            raise HTTPException(status_code=400, detail="Input should be 'github' or 'jira'")
        
        self.token = token
    
    async def exists(self, owner, repo):
        print("Exists")
        if self.client.name == "github":
            print("Github")
            try:
                github = GithubClient(token=self.token, owner=owner, repo=repo)
                repo = await github.validate_repo()
                return repo
            except ClientException as e:
                raise HTTPException(status_code=e.status_code, detail=str(e))
            except HTTPException as e:
                raise e
            except Exception as e:
                raise HTTPException(status_code=500, detail="Internal Server Error")
        else:
            raise HTTPException(status_code=400, detail="Client not supported")
            
    async def fetch_issues(self, owner, repo) -> RepositoryIssues:
        if self.client.name == "github":
            try:
                exists = milvus_client.get_collections()
                github = GithubClient(token=self.token, owner=owner, repo=repo)
                repo = await github.validate_repo()
                
                if repo in exists.data:
                    raise HTTPException(status_code=400, detail="Repository already exists in Milvus")
               
                data = await github.fetch_repo_data()
                RepositoryIssues.model_validate(data)
                return data
            
            except ClientException as e:
                raise HTTPException(status_code=e.status_code, detail=str(e))
            except HTTPException as e:
                raise e
            except Exception as e:
                raise HTTPException(status_code=500, detail="Internal Server Error")
            
        else:
            raise HTTPException(status_code=400, detail="Client not supported")



