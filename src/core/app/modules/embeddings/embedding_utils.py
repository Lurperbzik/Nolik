from sentence_transformers import SentenceTransformer
from typing import List
import asyncio

from app.models.collection import EmbeddedCollection, Collection, EmbeddedIssue


class Embedding:
    
    def __init__(self):
        self.model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')

    async def from_collection(self, collection: Collection) -> EmbeddedCollection:
        """
        Generate embeddings for the issues asynchronously.

        Args:
            collection (Collection): Collection of issues to generate embeddings for.
        
        Returns:
            EmbeddedCollection: Collection with issues and their embeddings.
        """
        embedded_collection = EmbeddedCollection(
            owner=collection.owner,
            name=collection.name,
            url=collection.url,
            platform=collection.platform,
            embedded_issues=[]
        )

        for issue in collection.issues:
            embedding = await asyncio.to_thread(self.model.encode, issue.title + " " + issue.body)
            embedded_issue = EmbeddedIssue(
                embedding=embedding,
                issue=issue
            )
            embedded_collection.embedded_issues.append(embedded_issue)

        return embedded_collection

    async def from_issue(self, issue: str) -> List[float]:
        """
        Generate embeddings for the issue asynchronously.

        Args:
            issue(str): Issue to generate embeddings for.

        Returns:
            List[float]: Embeddings for the issue.
        """
        return await asyncio.to_thread(self.model.encode, issue)

embedding_instance = Embedding()
