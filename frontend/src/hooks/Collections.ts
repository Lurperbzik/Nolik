import { useQuery } from '@tanstack/react-query';

export type RepoProps = {
  url: string;
  plataform: string;
  owner: string;
  repo: string;
};

const fetchCollections = async (): Promise<RepoProps[]> => {
  const response = await fetch('http://localhost:8000/api/milvus/collections');
  return response.json();
};

export const useCollections = () => {
  return useQuery<RepoProps[]>({
    queryKey: ['collections'],
    queryFn: fetchCollections,
  });
};
