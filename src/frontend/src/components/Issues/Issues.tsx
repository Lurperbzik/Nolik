import { Space } from "@mantine/core";
import { Issue, IssueJSON } from "../../models/Issue";
import { IssueConversation } from "./IssueConversation";

interface IssuesProps {
  data: IssueJSON[];
}

export function Issues({ data }: IssuesProps) {
  return data.map((issue, index) => (
    <div key={`issue-${index}`}>
      <IssueConversation issue={Issue.fromJSON(issue)} />
      <Space h="md" />
    </div>
  ));
}
