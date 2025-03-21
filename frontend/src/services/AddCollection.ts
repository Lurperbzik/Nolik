import { useState } from 'react';

type MessagePayload = {
  owner: string;
  repo: string;
};

const usePostMessage = ({ owner, repo }: MessagePayload) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMessage = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:8000/api/general/fetch/issues?owner=${owner}&repo=${repo}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: '',
        },
      );

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

  return { loading, error, success, postMessage };
};

export default usePostMessage;
