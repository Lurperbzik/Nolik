import { HookService } from '../../HookService';
import { IssueJSON } from '../../../models/Issue';
import { Search } from '../../../models/Search';

type useSearchIssuesProps = {
  params: Search;
  setData: React.Dispatch<React.SetStateAction<IssueJSON[]>>;
};

export const useSearchIssues = ({ params, setData }: useSearchIssuesProps) => {
  const { loading, error, request } = HookService({
    request: {
      path: '/api/issue-similarity',
      method: 'POST',
      body: JSON.stringify({
        collection_url: params.url,
        issue: params.message,
      }),
    },
    setData: setData,
  });

  const searchIssues = async () => {
    const response = await request();
    return response;
  };

  return { loading, error, searchIssues };
};
