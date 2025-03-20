import httpx

from  modules.api_clients.model import Issues, RepositoryIssues, Issue, Comment, ClientException
from modules.api_clients.github_client.graphql_queries import FetchIssues, FetchComments

class GithubClient:
    def __init__(self, token: str, owner: str, repo: str):
        self.token = token  
        self.owner = owner
        self.repo = repo
        self.url = "https://api.github.com/graphql" 
        self.headers = {"Authorization": f"Bearer {self.token}"}
        self.client = httpx.AsyncClient(timeout=30, headers=self.headers)


    async def close(self):
            """Closes the HTTP client."""
            await self.client.aclose()

    async def fetch_repo_data(self) -> RepositoryIssues:
        """
        Fetches all issues from one repository and returns them in a structured way.

        Args:
            None

        Returns:
            RepositoryIssues: Repository issues and comments from one repository

        Raises:
            Exception: If the repository does not exist
        """
        try:
            repo_url = await self.validate_repo()
            issues = await self.fetch_all_issues()
            issues = await self.fetch_extra_comments(issues)
            await self.close()
            return RepositoryIssues(url=repo_url, issues=self.process_data(issues).issues)
        except Exception as e:
            raise e
        
    async def validate_repo(self) -> str:
        """ 
        Validates if the repository exists 

        Args:
            None

        Returns:
            str: URL of the repository
        
        Raises:
            Exception: If the response status code is not 200 
        """
        response = await self.client.get(f"https://api.github.com/repos/{self.owner}/{self.repo}")
        if response.status_code == 200:
            return f"https://api.github.com/repos/{self.owner}/{self.repo}"

        else:
            raise ClientException(response.json()['message'], response.status_code)

    async def fetch_all_issues(self) -> dict:
        """
        Gets all issues from a repository in a single request batch using pagination,
        containing the first 100 comments for each issue

        Args:
            None

        Returns:
            dict: All issues from the repository with extra information
        
        Raises:
            Exception: If the response status code is not 200
        """

        all_issues = []
        issue_cursor = None

        while True:
            response = await self.client.post(self.url, json=FetchIssues.json_query(self.owner, self.repo, issue_cursor))
            if response.status_code != 200:
                raise ClientException(response.json()['message'], response.status_code)
            
            data = response.json()
            all_issues.extend(data['data']['repository']['issues']['nodes'])
            issue_cursor = data['data']['repository']['issues']['pageInfo']['endCursor']

            if not data['data']['repository']['issues']['pageInfo']['hasNextPage']:
                break

        return all_issues
    
    async def fetch_extra_comments(self, issues) -> dict:

        """
        Gets all comments from each issue in a repository.

        Args:
            issues (dict): The issues from the response
        
        Returns:
            dict: All issues from the repository with extra information
        
        Raises:
            Exception: If the response status code is not 200
        """

        for issue in issues:
            if not issue['comments']['pageInfo']['hasNextPage']:
                continue
            
            comments = issue['comments']['nodes']
            comment_cursor = issue['comments']['pageInfo']['endCursor']
              
            while True:
                response = await self.client.post(self.url, json=FetchComments.json_query(self.owner, self.repo, issue['number'], comment_cursor))

                if response.status_code != 200:
                    raise ClientException(response.json()['message'], response.status_code)
                
                data = response.json()
                comments.extend(data['data']['repository']['issue']['comments']['nodes'])
                comment_cursor = data['data']['repository']['issue']['comments']['pageInfo']['endCursor']
                if not data['data']['repository']['issue']['comments']['pageInfo']['hasNextPage']:
                    break

            issue['comments']['nodes'] = comments

        return issues
    
    def process_data(self, issues: dict) -> Issues:
        """
        Processes the data from the response and returns a list of issues

        Args:
            issues (dict): The issues from the response

        Returns:
            Issues: The issues from the response
        """
        processeded_issues = []
        for issue in issues:
            processed_issue = Issue (
                number=issue.get('number'),
                title=issue.get('title'),
                body=issue.get('body'),
                url=issue.get('url'),
                state=issue.get('state'),
                state_reason=issue.get('stateReason', None),
                author=issue.get('author').get('login') if issue.get('author') else None,
                comments=[]
            )
            for comment in issue.get('comments', {}).get('nodes', []):
                processed_issue.comments.append(Comment(
                    body=comment.get('body'),
                    author=comment.get('author').get('login') if comment.get('author') else None
                ))
            processeded_issues.append(processed_issue)
        
        return Issues(issues=processeded_issues)
