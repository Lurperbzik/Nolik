import {
  Card,
  Box,
  Flex,
  Paper,
  Title,
  Button,
  Space,
  Collapse,
} from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { Comments } from './Comments';
import { CgPushChevronDown } from 'react-icons/cg';
import { useDisclosure } from '@mantine/hooks';
import { Issue } from '../../../models/Issue';
import './Issues.css';

type IssueProps = {
  issue: Issue;
};

export function IssueTitle({ issue }: IssueProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Card shadow="sm" radius="md" withBorder>
      <Box>
        <Flex justify="center" direction="column" mb={5} gap="md">
          <Paper
            bg="green"
            shadow="md"
            radius="sm"
            p="xs"
            style={{
              cursor: 'default',
              alignSelf: 'flex-end',
            }}
          >
            <Title order={4}>{issue.distance}</Title>
          </Paper>
          <Card shadow="sm" radius="md" withBorder>
            <Title order={1}>
              <ReactMarkdown>{issue.title}</ReactMarkdown>
            </Title>
            <Space h="md" />
            <Title order={2}>
              <ReactMarkdown>{issue.body}</ReactMarkdown>
            </Title>
          </Card>
          <Button onClick={toggle} variant="default" fullWidth>
            <CgPushChevronDown size="24px" />
          </Button>
        </Flex>

        <Collapse
          in={opened}
          transitionDuration={200}
          transitionTimingFunction="linear"
        >
          <Space h="md" />
          <Comments comments={issue.comments} />
        </Collapse>
      </Box>
    </Card>
  );
}
