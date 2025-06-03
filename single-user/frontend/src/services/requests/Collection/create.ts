import { HookService } from '../../HookService';
import { getGitHubCollection } from '../../../utils/urlHelpers';

type Props = {
  name: string;
  owner: string;
};

export const useCreateCollection = ({ name, owner }: Props) => {
  const platform = 'GitHub';
  const url = getGitHubCollection(name, owner, platform);
  const { loading, error, request } = HookService({
    request: {
      path: '/api/collections',
      method: 'POST',
      body: JSON.stringify({
        name: name,
        owner: owner,
        url: url,
        platform: platform,
      }),
    },
  });

  const createCollection = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, createCollection };
};
