import { Blockquote } from "@mantine/core";
import { MarkdownLiteRenderer } from "../../utils/MarkdownLiteRenderer";
import { useColors } from "../../theme/theme.context";

interface CommentProps {
  description: string;
  author?: string;
  issueAuthor?: string;
}

export function Comment({ description, author, issueAuthor }: CommentProps) {
  const { colors } = useColors();
  const color = author === issueAuthor ? colors.commentAuthor : colors.comment;
  return (
    <Blockquote color={color} cite={author}>
      <MarkdownLiteRenderer text={description} />
    </Blockquote>
  );
}
