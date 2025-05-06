import { ActionIcon, Text, Title } from '@mantine/core';
import { PiLinkBold } from 'react-icons/pi';
import { MarkdownLiteRenderer } from '../../../utils/MarkdownLiteRenderer';

interface HeaderProps {
  title: string;
  description: string;
  author?: string;
  distance: string;
  url: string;
}

export function Header({
  title,
  description,
  author,
  distance,
  url,
}: HeaderProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Text
          fw={700}
          c={'blue'}
          td={'underline'}
          style={{ alignSelf: 'flex-end' }}
        >
          {distance}
        </Text>
        <ActionIcon
          variant="light"
          size="md"
          onClick={() => {
            const urlToOpen = url;
            if (!urlToOpen) {
              return;
            }
            window.open(urlToOpen, '_blank');
          }}
        >
          <PiLinkBold />
        </ActionIcon>
      </div>
      <Title
        order={3}
        style={{ marginTop: 'var(--mantine-spacing-md)', opacity: 0.6 }}
      >
        {title}
      </Title>
      <div style={{ marginTop: 'var(--mantine-spacing-md)' }}>
        <MarkdownLiteRenderer text={description} />
      </div>
      <Text fs={'italic'} className="m_dde51a35 mantine-Blockquote-cite">
        {author}
      </Text>
    </div>
  );
}
