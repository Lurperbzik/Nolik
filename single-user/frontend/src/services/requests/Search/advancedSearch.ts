import { HookService } from '../../HookService';
import { IssueJSON } from '../../../models/Issue';
import { AdvancedSearch } from '../../../models/Search';

type useAdvancedSearchIssuesProps = {
  params: AdvancedSearch;
  setData: React.Dispatch<React.SetStateAction<IssueJSON[]>>;
};

export const useAdvancedSearchIssues = ({
  params,
  setData,
}: useAdvancedSearchIssuesProps) => {
  const { loading, error, request } = HookService({
    request: {
      path: '/api/advanced-issue-similarity',
      method: 'POST',
      body: JSON.stringify({
        collection_url: params.url,
        issue: params.message,
        limit: params.limit,
        required_words: params.requiredWords,
        accepted_deviation: params.acceptedDeviation,
        min_num_comments: params.minNumComments,
        state: params.state,
      }),
    },
    setData: setData,
  });

  const advancedSearchIssues = async () => {
    const response = await request();
    return response;
  };

  return { loading, error, advancedSearchIssues };
};
