import pytest, random
from app.models.collection import Collection, Issue, IssueComment, EmbeddedCollection, EmbeddedIssue
from app.modules.milvus.milvus_client import MilvusConn
from app.modules.models.response_model import ClientException

def generate_random_embedding(dimensions: int = 384):
    return [random.uniform(-1, 1) for _ in range(dimensions)]

@pytest.fixture
def milvus_conn():
    """Fixture to get a unique instance of MilvusConn."""
    return MilvusConn()

@pytest.fixture
def test_collection(milvus_conn):
    """Fixture that creates and deletes a test collection."""
    collection = Collection(
        name="test_collection",
        owner="test_owner",
        url="http://test_url.com",
        platform="test_platform",
        issues=[],
    )

    # Ensure the collection does not exist before creating it
    if milvus_conn.has_collection(collection.url):
        milvus_conn.delete_collection(collection.url)

    yield collection

    # Clean up after each test
    if milvus_conn.has_collection(collection.url):
        milvus_conn.delete_collection(collection.url)

@pytest.fixture
def embedded_collection():
    issue1 = Issue(
        number=1,
        title="Error en el sistema de login",
        body="El botón de login no funciona en móviles",
        state="open",
        state_reason=None,
        url="https://example.com/issues/1",
        author="user1",
        comments=[
            IssueComment(
                body="He confirmado el error en iOS",
                author="user2"
            )
        ]
    )

    issue2 = Issue(
        number=2,
        title="Mejora: Añadir autenticación de dos factores",
        body="Sería bueno añadir 2FA para mayor seguridad",
        state="closed",
        state_reason="completed",
        url="https://example.com/issues/2",
        author="user3",
        comments=[]
    )

    issue3 = Issue(
        number=3,
        title="Documentación faltante",
        body="Falta documentación para la API v2",
        state="open",
        state_reason=None,
        url="https://example.com/issues/3",
        author="user4",
        comments=[
            IssueComment(
                body="Estoy trabajando en esto",
                author="user1"
            ),
            IssueComment(
                body="Gracias por la actualización",
                author="user4"
            )
        ]
    )

    embedded_collection = EmbeddedCollection(
        name="Problemas del sistema principal",
        owner="team-engineering",
        url="https://example.com/collections/main-issues",
        platform="GitHub",
        embedded_issues=[
            EmbeddedIssue(
                embedding=generate_random_embedding(),
                issue=issue1
            ),
            EmbeddedIssue(
                embedding=generate_random_embedding(),
                issue=issue2
            ),
            EmbeddedIssue(
                embedding=generate_random_embedding(),
                issue=issue3
            )
        ]
    )
    return embedded_collection

def test_singleton():
    """Verify that MilvusConn follows the Singleton pattern."""
    conn1 = MilvusConn()
    conn2 = MilvusConn()
    
    assert conn1 is conn2, "MilvusConn should be a singleton."


def test_create_collection(milvus_conn, test_collection):
    """Ensure a collection can be created and cannot be duplicated."""
    assert not milvus_conn.has_collection(test_collection.url), "Collection already existed before the test."

    milvus_conn.create_collection(test_collection)
    assert milvus_conn.has_collection(test_collection.url), "Collection was not created successfully."

    with pytest.raises(ClientException) as excinfo:
        milvus_conn.create_collection(test_collection)
    
    assert str(excinfo.value) == "Collection already exists.", "The error message is not as expected."


def test_delete_collection(milvus_conn, test_collection):
    """Ensure a collection can be deleted successfully."""
    milvus_conn.create_collection(test_collection)
    assert milvus_conn.has_collection(test_collection.url), "Collection was not created successfully."

    milvus_conn.delete_collection(test_collection.url)
    assert not milvus_conn.has_collection(test_collection.url), "Collection was not deleted successfully."


def test_has_collection(milvus_conn, test_collection):
    """Verify the has_collection method."""
    milvus_conn.create_collection(test_collection)
    
    assert milvus_conn.has_collection(test_collection.url), "has_collection does not detect an existing collection."
    assert not milvus_conn.has_collection("non_existent_collection"), "has_collection detects a non-existent collection."


def test_get_collections(milvus_conn, test_collection):
    """Ensure get_collections returns a valid list."""
    initial_collections = milvus_conn.get_collections()
    
    milvus_conn.create_collection(test_collection)
    updated_collections = milvus_conn.get_collections()
    
    assert isinstance(updated_collections, list), "get_collections did not return a list."
    assert len(updated_collections) == len(initial_collections) + 1, "The number of collections did not increase after creating a new one."

    milvus_conn.delete_collection(test_collection.url)


def test_create_and_delete_multiple_collections(milvus_conn):
    """Ensure multiple collections can be created and deleted without issues."""
    collections = [
        Collection(name=f"test_collection_{i}", owner="test_owner", url=f"http://test_url_{i}.com", platform="test_platform", issues=[])
        for i in range(3)
    ]

    for col in collections:
        milvus_conn.create_collection(col)
        assert milvus_conn.has_collection(col.url), f"Collection {col.name} was not created successfully."

    for col in collections:
        milvus_conn.delete_collection(col.url)
        assert not milvus_conn.has_collection(col.url), f"Collection {col.name} was not deleted successfully."

def test_insert_data(milvus_conn, embedded_collection):
    
    # Create the collection
    milvus_conn.create_collection(embedded_collection)
    assert milvus_conn.has_collection(embedded_collection.url), "Collection was not created successfully."
    # Insert data into the collection
    milvus_conn.insert_data(embedded_collection)
    assert milvus_conn.has_collection(embedded_collection.url), "Collection was not created successfully."
    
    # Delete the collection
    milvus_conn.delete_collection(embedded_collection.url)
    assert not milvus_conn.has_collection(embedded_collection.url), "Collection was not deleted successfully."

def test_insert_data_without_collection(milvus_conn, embedded_collection):
    """Test inserting data into a non-existent collection."""
    with pytest.raises(ClientException) as excinfo:
        milvus_conn.insert_data(embedded_collection)
    
    assert str(excinfo.value) == "Collection does not exist.", "The error message is not as expected."

def test_search_data(milvus_conn, embedded_collection):
    """Test searching for data in a collection."""
    # Create the collection
    milvus_conn.create_collection(embedded_collection)
    assert milvus_conn.has_collection(embedded_collection.url), "Collection was not created successfully."
    
    # Insert data into the collection
    milvus_conn.insert_data(embedded_collection)
    
    # Search for an issue
    search_result = milvus_conn.search_data(embedded_collection.url, embedded_collection.embedded_issues[0].embedding)
    
    assert isinstance(search_result, list), "Search result is not a list."
    assert len(search_result) > 0, "Search result is empty."
    
    # Delete the collection
    milvus_conn.delete_collection(embedded_collection.url)
    assert not milvus_conn.has_collection(embedded_collection.url), "Collection was not deleted successfully."