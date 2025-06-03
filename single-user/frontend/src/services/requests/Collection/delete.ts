import { HookService } from '../../HookService';
type useDeleteCollectionProps = {
  url: string | undefined;
};

export const useDeleteCollection = ({ url }: useDeleteCollectionProps) => {
  const { loading, error, request } = HookService({
    request: {
      path: '/api/collections',
      method: 'DELETE',
      body: JSON.stringify({ url }),
    },
  });

  const deleteCollection = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, deleteCollection };
};
