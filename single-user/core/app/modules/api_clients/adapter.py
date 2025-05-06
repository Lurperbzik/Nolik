from app.models.collection import Collection 

from app.modules.models.response_model import ClientException
from app.modules.api_clients.github_client.github_client import GithubClient


class ApiClient:
    def __init__(self, client: str, token: str):
        """
        Initializes the ApiClient with the specified client type and token.

        Args:
            client (str): The type of API client to use (e.g., "github").
            token (str): The authentication token for the API client.
        """
        if (client != "GitHub"):
            raise ClientException(
                message=f"Client not supported",
                status_code=400
            )
        
        self.client = client
        self.token = token
    
    async def exists(self, owner: str, collection: str) -> bool:
        if self.client == "GitHub":
            try:
                github = GithubClient(
                    token=self.token, 
                    owner=owner,
                    repo=collection
                )
                await github.validate_repo()
                return True
            except ClientException as e:
                raise e
            except Exception as e:
                raise ClientException(
                    message=f"Error validating repository: {e}",
                    status_code=500
                )
        else:
            raise ClientException(
                message=f"Client not supported",
                status_code=400
            )
    
    async def fetch(self, owner: str, collection: str) -> Collection:
        if self.client == "GitHub":
            try:
                github_client = GithubClient(
                    token=self.token, 
                    owner=owner,
                    repo=collection
                )
                await github_client.validate_repo()
                data = await github_client.fetch_repo_data()
                Collection.model_validate(data)
                return data
            
            except ClientException as e:
                raise e
            
            except Exception as e:
                raise ClientException(
                    message=f"Error fetching repository: {e}",
                    status_code=500
                )
        else:
            raise ClientException(
                message=f"Client not supported",
                status_code=400
            ) 