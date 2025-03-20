import { useState, useEffect, useRef } from 'react';
import { Textarea, Text, ScrollArea, Card } from '@mantine/core';
import { ConversationProps } from '../Files';
import usePostMessage, { IssueProps } from '../../../../../hooks/SendMessage';

type InputProps = {
  message: string;
  key: number;
};

function Input({ message, key }: InputProps) {
  message = message.trim();
  if (message === '') {
    return null;
  }

  return (
    <div key={key}>
      <Text style={{ whiteSpace: 'pre-wrap' }}>{message}</Text>
      <hr
        style={{
          border: 0,
          height: 0,
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      />
    </div>
  );
}

function Issue(issue: IssueProps) {
  return (
    <Card shadow="sm" radius="md" withBorder style={{ marginBottom: 10 }}>
      <Text
        size="sm"
        c="dimmed"
        style={{
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word',
          maxWidth: '100%',
          wordBreak: 'break-word',
          wordWrap: 'break-word',
        }}
      >
        {JSON.stringify(issue, null, 2)}
      </Text>
    </Card>
  );
}

export function MainChat({ repoURL }: ConversationProps) {
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<React.ReactNode[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState(0); // PARA LOS IDENTIFICADORES DE LOS MENSAJES

  const { loading, data, postMessage } = usePostMessage({
    url: repoURL,
    message: text,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.shiftKey)) {
      event.preventDefault();
      setText((prevText) => prevText + '\n');
    } else if (event.key === 'Enter') {
      event.preventDefault();

      const newMessage = Input({ message: text, key: counter });
      if (!newMessage) {
        return;
      }
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCounter((prevCounter) => prevCounter + 1);

      postMessage();
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
        ...data.map((issue, index) => (
          <Issue key={counter + '-' + index} {...issue} />
        )),
      ]);
      setCounter((prevCounter) => prevCounter + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        scrollbarSize={8}
        scrollbars="y"
        style={{
          marginBottom: '150px',
          padding: '0 10%',
        }}
      >
        {messages}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <Textarea
        disabled={loading || !repoURL}
        onKeyDown={handleKeyDown}
        autosize
        minRows={5}
        maxRows={10}
        placeholder="Type your issue..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '10%',
          right: '10%',
        }}
      />
    </div>
  );
}
