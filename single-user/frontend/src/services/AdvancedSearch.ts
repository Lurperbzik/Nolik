import { useState } from 'react';
import { IssueJSON } from '../models/Issue';

type MessagePayload = {
  url: string;
  message: string;
  limit: number;
  requiredWords: string[];
  acceptedDeviation: number;
  minNumComments: number;
  state: string;
};

type MessageResponse = IssueJSON[];

const useAdvancedSearch = (messagePayload: MessagePayload) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MessageResponse | null>(null);

  const postMessage = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/advanced-issue-similarity',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            collection_url: messagePayload.url,
            issue: messagePayload.message,
            limit: messagePayload.limit,
            required_words: messagePayload.requiredWords,
            accepted_deviation: messagePayload.acceptedDeviation,
            min_num_comments: messagePayload.minNumComments,
            state: messagePayload.state,
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

export default useAdvancedSearch;
