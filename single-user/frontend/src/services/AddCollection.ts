import { useState } from 'react';
import { getRepo } from '../utils/urlHelpers';

type MessagePayload = {
  owner: string;
  repo: string;
};

export const useAddRepository = ({ owner, repo }: MessagePayload) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRepository = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const repository = getRepo(repo, owner, 'GitHub');
    if (!repository) {
      setError('Invalid repository URL');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repository.name,
          owner: repository.owner,
          url: repository.url,
          platform: repository.platform,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError(
            'Owner or repo not found, please try again.\nIf the repository is private, make sure you have the necessary permissions.',
          );
        } else {
          setError(
            'There was a problem while trying to load the repository data.',
          );
        }
      }
      setSuccess(true);
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

  return { loading, error, success, addRepository };
};
