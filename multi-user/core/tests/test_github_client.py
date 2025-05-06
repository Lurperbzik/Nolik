import pytest, json
from app.modules.models.response_model import ClientException
from app.modules.api_clients.adapter import ApiClient

from dotenv import load_dotenv
import os 

load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")


def test_platform():
    """
    Test the platform of the API client.
    """
    with pytest.raises(ClientException) as excinfo:
        ApiClient(
            client="unsupported_client",
            token="dummy_token"
        )
    assert str(excinfo.value) == "Client not supported", "The error message is not as expected."

@pytest.mark.asyncio
async def test_github_client_exists():
    """
    Test the existence of a GitHub repository.
    """
    github_client = ApiClient(
        client="GitHub",
        token=GITHUB_TOKEN
    )
    assert github_client.client == "GitHub", "The client is not set correctly."
    assert await github_client.exists(
        owner="octocat",
        collection="Hello-World"
    ) is True, "The GitHub repository existence check failed."

    with pytest.raises(ClientException) as excinfo:
        await github_client.exists(
            owner="invalid_owner",
            collection="invalid_repo"
        )
    assert excinfo.value.status_code == 404, "The status code is not as expected."

@pytest.mark.asyncio
async def test_github_client_fetch():
    """
    Test the fetching of a GitHub repository.
    """
    github_client = ApiClient(
        client="GitHub",
        token=GITHUB_TOKEN
    )
    assert github_client.client == "github", "The client is not set correctly."
    data = await github_client.fetch(
        owner="Lurperbzik",
        collection="Admin3"
    )
 
    print(data.model_dump_json(indent=2))
    data = await github_client.fetch(
        owner="octocat",
        collection="Hello-World"
    )
    print(data.model_dump_json(indent=2))