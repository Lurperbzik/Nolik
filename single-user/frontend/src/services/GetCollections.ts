import { useState } from 'react';
import { Repository } from '../models/Repositories';

type useGetCollectionsProps = {
  setData: (data: Repository[]) => void;
};

export const useGetCollections = ({ setData }: useGetCollectionsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCollections = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/collections');

      if (!response.ok) {
        setError(
          'There was a problem while trying to load the repository data.',
        );
      } else {
        setData(await response.json());
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(
          `There was a problem while trying to load the repository data.\n${error.message}`,
        );
      } else {
        setError(
          'There was a problem while trying to load the repository data.\nAn unknown error occurred',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, getCollections };
};
