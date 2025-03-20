import { useDisclosure } from '@mantine/hooks';
import {
  Button,
  Collapse,
  Box,
  Flex,
  Card,
  Paper,
  Title,
  Space,
} from '@mantine/core';
import { CgPushChevronDown } from 'react-icons/cg';

import { Issue, IssueComment } from './models/Issue';

type CommentsProps = {
  comments: IssueComment[];
};

type IssueProps = {
  issue: Issue;
};

const data = [
  {
    distance: 20.514606475830078,
    issue: {
      number: 596,
      title: 'B ',
      body: '',
      state: 'CLOSED',
      state_reason: 'COMPLETED',
      url: 'https://github.com/danielmiessler/SecLists/issues/596',
      author: 'bug3j0',
      comments: [
        {
          body: 'No information given, closing.',
          author: 'g0tmi1k',
        },
      ],
    },
  },
  {
    distance: 19.428991317749023,
    issue: {
      number: 899,
      title: 'Imp',
      body: '',
      state: 'CLOSED',
      state_reason: 'COMPLETED',
      url: 'https://github.com/danielmiessler/SecLists/issues/899',
      author: 'erfanSVG',
      comments: [
        {
          body: 'Closing due to empty contets\r\n',
          author: 'g0tmi1k',
        },
      ],
    },
  },
  {
    distance: 19.3299560546875,
    issue: {
      number: 872,
      title: '..',
      body: '..',
      state: 'CLOSED',
      state_reason: 'COMPLETED',
      url: 'https://github.com/danielmiessler/SecLists/issues/872',
      author: 'bcejgek',
      comments: [
        {
          body: 'Closing due to lack of content',
          author: 'g0tmi1k',
        },
      ],
    },
  },
  {
    distance: 15.594079971313477,
    issue: {
      number: 634,
      title: 'Wow ',
      body: 'Need this ',
      state: 'CLOSED',
      state_reason: 'COMPLETED',
      url: 'https://github.com/danielmiessler/SecLists/issues/634',
      author: 'Demian71',
      comments: [],
    },
  },
  {
    distance: 11.525884628295898,
    issue: {
      number: 839,
      title: 'se',
      body: '',
      state: 'CLOSED',
      state_reason: 'COMPLETED',
      url: 'https://github.com/danielmiessler/SecLists/issues/839',
      author: 'ethicalhackerarbaz',
      comments: [
        {
          body: 'Empty issue - closing',
          author: 'g0tmi1k',
        },
      ],
    },
  },
];

function Comments({ comments }: CommentsProps) {
  return (
    <Flex gap="md" direction="column">
      {comments.map((comment, index) => (
        <Card key={index} shadow="sm" radius="md" withBorder>
          <Title order={3}>{comment.body}</Title>
        </Card>
      ))}
    </Flex>
  );
}

function IssueComponent({ issue }: IssueProps) {
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
            <Title order={1}>{issue.title}</Title>
            <Space h="md" />
            <Title order={2}>{issue.body}</Title>
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

export function Run() {
  return (
    <Flex justify="center" direction="column" mb={5} gap="md">
      {data.map((issue, index) => (
        <IssueComponent key={index} issue={Issue.fromJSON(issue)} />
      ))}
    </Flex>
  );
}
