import { Card, Spoiler, Space } from "@mantine/core";
import { Issue } from "../../models/Issue";
import { Header } from "./Header";
import { Comment } from "./Comment";
import "./Issues.module.css";
interface IssueConversationProps {
  issue: Issue;
}

export function IssueConversation({ issue }: IssueConversationProps) {
  const comments = issue.comments.map((comment, index) => (
    <Comment
      key={index}
      description={comment.body}
      author={comment.author}
      issueAuthor={issue.author}
    />
  ));

  return (
    <div>
      <Card
        withBorder
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f9f9f9",
          gap: "10px",
        }}
        radius={0}
      >
        <Header
          key={issue.number}
          title={issue.title}
          description={issue.body}
          author={issue.author}
          distance={issue.distance}
          url={issue.url}
        />
        <Space></Space>
        <Spoiler
          maxHeight={0}
          showLabel="Show comments"
          hideLabel="Hide comments"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {comments}
          </div>
        </Spoiler>
      </Card>
    </div>
  );
}
