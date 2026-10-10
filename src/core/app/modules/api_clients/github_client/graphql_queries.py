"""
Contains GraphQL queries for fetching issues and comments from GitHub.
Used by the GitHubClient class in github_client.py.
"""

class FetchIssues:
    QUERY = """
        query($owner: String!, $repo: String!, $issueCursor: String) {
            repository(owner: $owner, name: $repo) {
                issues(first: 100, after: $issueCursor) {
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                    nodes {
                        number
                        title
                        state
                        stateReason
                        body
                        url
                        author {
                            login
                        }
                        comments(first: 100) {
                            pageInfo {
                                endCursor
                                hasNextPage
                            }
                            nodes {
                                body
                                author {
                                    login
                                }
                            }
                        }
                    }
                }
            }
        }
    """

    @staticmethod
    def json_query(owner: str, repo: str, issue_cursor: str) -> dict:
        variables = {"owner": owner, "repo": repo, "issueCursor": issue_cursor}
        return {"query": FetchIssues.QUERY, "variables": variables}

class FetchComments:
    QUERY = """ 
        query($owner: String!, $repo: String!, $issueNumber: Int!, $commentCursor: String) {
            repository(owner: $owner, name: $repo) {
                issue(number: $issueNumber) {
                    comments(first: 100, after: $commentCursor) {
                        pageInfo {
                            endCursor
                            hasNextPage
                        }
                        nodes {
                            body
                            author {
                                login
                            }
                        }
                    }
                }
            }
        }
    """

    @staticmethod
    def json_query(owner: str, repo: str, issue_number: int, comment_cursor: str) -> dict:
        variables = {"owner": owner, "repo": repo, "issueNumber": issue_number, "commentCursor": comment_cursor}
        return {"query": FetchComments.QUERY, "variables": variables}