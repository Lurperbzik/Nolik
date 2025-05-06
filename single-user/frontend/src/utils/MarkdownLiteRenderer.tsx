import React from 'react';

interface MarkdownLiteRendererProps {
  text: string;
}
export function MarkdownLiteRenderer({ text }: MarkdownLiteRendererProps) {
  const renderMarkdown = (input: string): React.ReactNode[] => {
    const result: React.ReactNode[] = [];

    const regex =
      /!\[([^\]]*?)\]\((.*?)\)|\[(.*?)\]\((.*?)\)|\*\*(.*?)\*\*|\bhttps?:\/\/[^\s<>"']+/g;

    let lastIndex = 0;
    let match;
    let key = 0;
    let paragraph: React.ReactNode[] = [];

    const pushParagraph = () => {
      if (paragraph.length > 0) {
        result.push(
          <p
            key={`para-${key++}`}
            style={{ margin: '0.5em 0', wordBreak: 'break-word' }}
          >
            {paragraph}
          </p>,
        );
        paragraph = [];
      }
    };

    while ((match = regex.exec(input)) !== null) {
      const matchStart = match.index;

      if (matchStart > lastIndex) {
        const plain = input.slice(lastIndex, matchStart);
        paragraph.push(plain);
      }

      if (match[0].startsWith('!')) {
        pushParagraph();
        const alt = match[1];
        const url = match[2];
        result.push(
          <div key={`img-${key++}`} style={{ maxWidth: '100%' }}>
            <img
              src={url}
              alt={alt}
              style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                margin: '0.5em 0',
              }}
            />
          </div>,
        );
      } else if (match[3] && match[4]) {
        paragraph.push(
          <a
            key={`link-${key++}`}
            href={match[4]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[3]}
          </a>,
        );
      } else if (match[5]) {
        paragraph.push(<strong key={`bold-${key++}`}>{match[5]}</strong>);
      } else if (match[0].startsWith('http')) {
        paragraph.push(
          <a
            key={`url-${key++}`}
            href={match[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[0]}
          </a>,
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < input.length) {
      paragraph.push(input.slice(lastIndex));
    }

    pushParagraph();

    return result;
  };

  return <div>{renderMarkdown(text)}</div>;
}
