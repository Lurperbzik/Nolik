import { ComponentProps } from 'react';
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
  createTheme,
  MantineProvider,
  rem,
} from '@mantine/core';
import { CgPushChevronDown } from 'react-icons/cg';
import ReactMarkdown from 'react-markdown';
import { Issue, IssueComment, IssueJSON } from '../../../../../../models/Issue';
import './Issues.css';

const theme = createTheme({
  headings: {
    fontWeight: '400',

    sizes: {
      h1: {
        fontSize: rem(20),
        lineHeight: '1.4',
        fontWeight: '700',
      },
      h2: { fontSize: rem(14), lineHeight: '1.4' },
      h3: { fontSize: rem(12), lineHeight: '1.4' },
      h4: { fontSize: rem(10), lineHeight: '1.4' },
      h5: { fontSize: rem(8), lineHeight: '1.4' },
      h6: { fontSize: rem(6), lineHeight: '1.4' },
    },
  },
});

type CommentsProps = {
  comments: IssueComment[];
};

type IssueProps = {
  issue: Issue;
};

type IssuesProps = {
  data: IssueJSON[];
};

type TitleProps = ComponentProps<typeof Title>;

const CustomTitle: React.FC<TitleProps> = (props) => {
  return (
    <Title
      {...props}
      style={{
        maxWidth: '100%',
        height: 'auto',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        wordWrap: 'break-word',
        ...props.style,
      }}
    />
  );
};

function Comments({ comments }: CommentsProps) {
  return (
    <Flex gap="md" direction="column">
      {comments.map((comment, index) => (
        <Card key={index} shadow="sm" radius="md" withBorder>
          <CustomTitle order={3}>
            <ReactMarkdown>{comment.body}</ReactMarkdown>
          </CustomTitle>
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
            <CustomTitle order={4}>{issue.distance}</CustomTitle>
          </Paper>
          <Card shadow="sm" radius="md" withBorder>
            <CustomTitle order={1}>
              <ReactMarkdown>{issue.title}</ReactMarkdown>
            </CustomTitle>
            <Space h="md" />
            <CustomTitle order={2}>
              <ReactMarkdown>{issue.body}</ReactMarkdown>
            </CustomTitle>
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

export function Issues({ data }: IssuesProps) {
  return (
    <MantineProvider theme={theme}>
      <Flex justify="center" direction="column" mb={5} gap="md">
        {data.map((issue, index) => (
          <IssueComponent key={index} issue={Issue.fromJSON(issue)} />
        ))}
      </Flex>
    </MantineProvider>
  );
}
