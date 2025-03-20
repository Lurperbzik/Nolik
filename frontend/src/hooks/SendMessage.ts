import { useState } from 'react';

type MessagePayload = {
  url: string;
  message: string;
};

export type IssueProps = {
  distance: number;
  issue: {
    number: number;
    title: string;
    body: string;
    state: string;
    stateReason: string;
    url: string;
    author: string;
    comments: string[];
  };
};

type MessageResponse = IssueProps[];

const usePostMessage = ({ url, message }: MessagePayload) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MessageResponse | null>(null);

  const postMessage = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/milvus/collections/issue-similarity',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            collection_url: {
              url: url,
            },
            issue_title: {
              body: message,
            },
          }),
        },
      );

      if (!response.ok) {
        setError(response.statusText);
        return;
      }

      const data: MessageResponse = await response.json();
      setData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, postMessage };
};

export default usePostMessage;
