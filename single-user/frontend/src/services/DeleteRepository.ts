import { useState } from 'react';

async function deleteCollection(url: string): Promise<void> {
  try {
    const response = await fetch('http://0.0.0.0:8000/api/collections', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    console.log('Collection deleted successfully');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export function useDeleteCollection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCollection(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
}
