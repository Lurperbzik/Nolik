import { useState } from 'react';

type MessagePayload = {
  owner: string;
  repo: string;
};

export const useCheckRepository = ({ owner, repo }: MessagePayload) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyRepository = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:8000/api/github/exists?repo_owner=${owner}&repo_name=${repo}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError(
            'Owner or repo not found, please try again.\nIf the repository is private, make sure you have the necessary permissions.',
          );
        } else if (response.status === 400) {
          setError('repository is already in the collection');
        } else {
          setError(
            'There was a problem while trying to load the repository data.',
          );
        }
      } else {
        setSuccess(true);
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

  return { loading, error, success, verifyRepository };
};
