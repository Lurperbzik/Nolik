from sentence_transformers import SentenceTransformer
from typing import List
import asyncio

from app.models.embeddings import RepositoryIssuesWithEmbeddings, RepositoryIssues, IssueWithEmbedding


class Embedding:
    
    def __init__(self):
        self.model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')

    async def generate_embeddings_from_repository(self, repository_issues: RepositoryIssues) -> RepositoryIssuesWithEmbeddings:
        """
        Generate embeddings for the issues asynchronously.

        Args:
            repository_issues(RepositoryIssues): Object containing repository issues.

        Returns:
            RepositoryIssuesWithEmbeddings: Object containing repository issues with embeddings.
        """
        repository_issues_with_embeddings = RepositoryIssuesWithEmbeddings(
            url=repository_issues.url,
            issues=[]
        )

        for issue in repository_issues.issues:
            embedding = await asyncio.to_thread(self.model.encode, issue.title + " " + issue.body)
            issue_with_embedding = IssueWithEmbedding(embedding=embedding, issue=issue)
            repository_issues_with_embeddings.issues.append(issue_with_embedding)            
        return repository_issues_with_embeddings

    async def generate_embedding_from_issue(self, issue: str) -> List[float]:
        """
        Generate embeddings for the issue asynchronously.

        Args:
            issue(str): Issue to generate embeddings for.

        Returns:
            List[float]: Embeddings for the issue.
        """
        return await asyncio.to_thread(self.model.encode, issue)

embedding_instance = Embedding()
