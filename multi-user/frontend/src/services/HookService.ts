import { useState } from "react";
const host = import.meta.env.VITE_USER_MANAGEMENT_HOST;
const port = import.meta.env.VITE_USER_MANAGEMENT_PORT;

type HookServiceProps = {
  request: {
    path: string;
    method: string;
    body?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData?: React.Dispatch<React.SetStateAction<any>>;
};

export const HookService = (data: HookServiceProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const request = async () => {
    setLoading(true);
    setError(false);

    try {
      const url = `http://${host}:${port}${data.request.path}`;
      const response = await fetch(url, {
        method: data.request.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: data.request.body,
        credentials: "include",
      });

      if (!response.ok) {
        setError(true);
        return false;
      } else {
        setSuccess(true);
        const responseData = await response.json();
        if (data.setData !== undefined) {
          data.setData(responseData);
        }

        return true;
      }
    } catch {
      setError(true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { success, loading, error, request };
};
