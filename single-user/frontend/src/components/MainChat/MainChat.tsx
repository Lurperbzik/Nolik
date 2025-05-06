import { useState, useEffect, useRef } from 'react';
import {
  Textarea,
  ScrollArea,
  Card,
  Switch,
  Tooltip,
  ActionIcon,
  Modal,
  TextInput,
  Fieldset,
  NativeSelect,
  Group,
  Button,
} from '@mantine/core';
import usePostMessage from '../../services/SendMessage';
import useAdvancedSearch from '../../services/AdvancedSearch';
import { UserInput } from './UserInput';
import { Issues } from './Issues/Issues';
import { MdOutlineEditNote } from 'react-icons/md';
import { BiSolidSend } from 'react-icons/bi';

interface ConversationProps {
  repoURL: string;
  style?: React.CSSProperties;
}

interface formProps {
  opened: boolean;
  checked: boolean;
  form: {
    limit: number;
    requiredWords: string[];
    acceptedDeviation: number;
    minNumComments: number;
    state: string;
  };
}

export function MainChat({ repoURL }: ConversationProps) {
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<React.ReactNode[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState(0); // PARA LOS IDENTIFICADORES DE LOS MENSAJES
  const [form, setForm] = useState<formProps>({
    opened: false,
    checked: false,
    form: {
      limit: 5,
      requiredWords: [],
      acceptedDeviation: 1000,
      minNumComments: 0,
      state: 'closed',
    },
  });

  const { data, postMessage } = usePostMessage({
    url: repoURL,
    message: text,
  });

  const { data: advanced_data, postMessage: postAdvancedMessage } =
    useAdvancedSearch({
      url: repoURL,
      message: text,
      limit: form.form.limit,
      requiredWords: form.form.requiredWords,
      acceptedDeviation: form.form.acceptedDeviation,
      minNumComments: form.form.minNumComments,
      state: form.form.state,
    });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.shiftKey)) {
      event.preventDefault();
      setText((prevText) => prevText + '\n');
    } else if (event.key === 'Enter') {
      event.preventDefault();

      const newMessage = UserInput({ message: text, key: counter });
      if (!newMessage) {
        return;
      }
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCounter((prevCounter) => prevCounter + 1);

      if (form.checked) {
        postAdvancedMessage();
      } else {
        postMessage();
      }
      setText('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (data && data.length > 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        <Issues key={counter} data={data} />,
      ]);
      setCounter((prevCounter) => prevCounter + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (advanced_data && advanced_data.length > 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        <Issues key={counter} data={advanced_data} />,
      ]);
      setCounter((prevCounter) => prevCounter + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advanced_data]);

  return (
    <div
      style={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <ScrollArea
        scrollbars="y"
        style={{
          marginBottom: '200px',
          marginTop: '40px',
          padding: '0 10%',
        }}
      >
        {messages}
        <div ref={messagesEndRef} style={{ height: '1px' }} />
      </ScrollArea>
      <Card
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '12%',
          right: '12%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 10px',
        }}
        withBorder
        shadow={'md'}
      >
        <Textarea
          variant="unstyled"
          disabled={!repoURL}
          onKeyDown={handleKeyDown}
          autosize
          minRows={5}
          maxRows={10}
          placeholder="Type your issue..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            transition: 'none',
          }}
        />
        <div
          style={{
            display: 'flex',
            margin: '10px',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            <Tooltip
              label="Edit advanced search options"
              color="gray"
              position="top-start"
              opacity={0.8}
            >
              <ActionIcon
                variant="default"
                onClick={() => setForm({ ...form, opened: true })}
              >
                <MdOutlineEditNote size="24" />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label="Apply advanced search options"
              refProp="ref"
              position="top-start"
              color="gray"
              opacity={0.8}
            >
              <div>
                <Switch
                  color="teal"
                  checked={form.checked}
                  style={{ marginTop: '5px' }}
                  onChange={() => setForm({ ...form, checked: !form.checked })}
                ></Switch>
              </div>
            </Tooltip>
          </div>
          <Tooltip
            label="Send message"
            color="gray"
            position="top-start"
            opacity={0.8}
          >
            <ActionIcon
              radius="xl"
              size="lg"
              variant="filled"
              color="gray"
              onClick={() => {
                const newMessage = UserInput({ message: text, key: counter });
                if (!newMessage) {
                  return;
                }
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setCounter((prevCounter) => prevCounter + 1);
                if (form.checked) {
                  postAdvancedMessage();
                } else {
                  postMessage();
                }
                setText('');
              }}
            >
              <BiSolidSend size="24" />
            </ActionIcon>
          </Tooltip>
        </div>
      </Card>
      <Modal
        opened={form.opened}
        onClose={() => setForm({ ...form, opened: false })}
        title="Advanced search options"
        size="lg"
        overlayProps={{
          opacity: 0.55,
        }}
      >
        <Fieldset
          legend="Options"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <TextInput
            label="Limit"
            description="Maximum number of issues to retrieve"
            placeholder="Limit"
            value={
              form.form.limit === null || isNaN(form.form.limit)
                ? ''
                : form.form.limit
            }
            onChange={(e) =>
              setForm({
                ...form,
                form: {
                  ...form.form,
                  limit: e.target.value === '' ? 0 : parseInt(e.target.value),
                },
              })
            }
          />
          <TextInput
            label="Required words"
            description="List of words separated by comma of which at least one must be present in the Issue title, body or comments"
            placeholder="Required words"
            value={form.form.requiredWords.join(', ')}
            onChange={(e) =>
              setForm({
                ...form,
                form: {
                  ...form.form,
                  requiredWords: e.target.value
                    .split(', ')
                    .map((word) => word.trim()),
                },
              })
            }
          />
          <TextInput
            label="Accepted deviation"
            description="Maximum accepted deviation in the results"
            placeholder="Accepted deviation"
            value={
              form.form.acceptedDeviation === null ||
              isNaN(form.form.acceptedDeviation)
                ? ''
                : form.form.acceptedDeviation
            }
            onChange={(e) =>
              setForm({
                ...form,
                form: {
                  ...form.form,
                  acceptedDeviation:
                    e.target.value === '' ? 0 : parseInt(e.target.value),
                },
              })
            }
          />
          <TextInput
            label="Minimum number of comments"
            description="Minimum number of comments in the issue"
            placeholder="Minimum number of comments"
            value={
              form.form.minNumComments === null ||
              isNaN(form.form.minNumComments)
                ? ''
                : form.form.minNumComments
            }
            onChange={(e) =>
              setForm({
                ...form,
                form: {
                  ...form.form,
                  minNumComments:
                    e.target.value === '' ? 0 : parseInt(e.target.value),
                },
              })
            }
          />
          <NativeSelect
            label="State"
            description="State of the issue (open, closed, all)"
            value={form.form.state}
            data={['open', 'closed', 'all']}
            onChange={(e) =>
              setForm({
                ...form,
                form: { ...form.form, state: e.target.value },
              })
            }
          />
        </Fieldset>
        <Group mt="lg" justify="flex-end">
          <Button
            onClick={() => setForm({ ...form, opened: false, checked: true })}
            variant="filled"
            color="green"
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
