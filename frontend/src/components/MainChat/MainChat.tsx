import { useState, useEffect, useRef } from 'react';
import { Textarea, ScrollArea } from '@mantine/core';
import usePostMessage from '../../services/SendMessage';
import { Issues } from './Issues/Issues';
import { UserInput } from './UserInput';

interface ConversationProps {
  repoURL: string;
  style?: React.CSSProperties;
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

      const newMessage = UserInput({ message: text, key: counter });
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
        <Issues key={counter} data={data} />,
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
