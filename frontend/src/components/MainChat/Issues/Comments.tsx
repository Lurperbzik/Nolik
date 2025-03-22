import { Flex, Card, Title } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { IssueComment } from '../../../models/Issue';
import './Issues.css';

type CommentsProps = {
  comments: IssueComment[];
};

export function Comments({ comments }: CommentsProps) {
  return (
    <Flex gap="md" direction="column">
      {comments.map((comment, index) => (
        <Card key={index} shadow="sm" radius="md" withBorder>
          <Title order={3}>
            <ReactMarkdown>{comment.body}</ReactMarkdown>
          </Title>
        </Card>
      ))}
    </Flex>
  );
}
