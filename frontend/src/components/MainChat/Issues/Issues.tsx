import { Flex } from '@mantine/core';
import { Theme } from './Theme';
import { Issue, IssueJSON } from '../../../models/Issue';
import { IssueTitle } from './Title';
import './Issues.css';

type IssuesProps = {
  data: IssueJSON[];
};

export function Issues({ data }: IssuesProps) {
  return (
    <Theme>
      <Flex justify="center" direction="column" mb={5} gap="md">
        {data.map((issue, index) => (
          <IssueTitle key={index} issue={Issue.fromJSON(issue)} />
        ))}
      </Flex>
    </Theme>
  );
}
