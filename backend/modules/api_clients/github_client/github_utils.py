def parse_github_url(url: str) -> dict:
    """
    Parse a Github URL to url, plataform, owner and repository name.

    Args:
        url (str): Github URL

    Returns:
        json: {
            "url": url,
            "plataform": "Github",
            "owner": owner,
            "repo": repository
        }
    """
    return {
        "url": url,
        "plataform": "Github",
        "owner": url.split("/")[-2],
        "repo": url.split("/")[-1]
    }
