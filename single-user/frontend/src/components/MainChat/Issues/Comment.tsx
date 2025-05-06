import { Blockquote } from '@mantine/core';
import { MarkdownLiteRenderer } from '../../../utils/MarkdownLiteRenderer';

interface CommentProps {
  description: string;
  author?: string;
  issueAuthor?: string;
}

export function Comment({ description, author, issueAuthor }: CommentProps) {
  const color = author === issueAuthor ? 'orange' : 'blue';
  return (
    <Blockquote color={color} cite={author}>
      <MarkdownLiteRenderer text={description} />
    </Blockquote>
  );
}
