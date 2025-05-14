import { useState, useEffect } from "react";
import { useSearchIssues } from "../../services/requests/Search/search";
import { useAdvancedSearchIssues } from "../../services/requests/Search/advancedSearch";
import { formProps } from "../Modal/SearchOptions/ModalOptions";
import { IssueJSON } from "../../models/Issue";
import { Chat } from "./Chat";

interface ChatContainerProps {
  collectionUrl: string;
}

export function ChatContainer({ collectionUrl }: ChatContainerProps) {
  const [text, setText] = useState<string>("");
  const [request, setRequest] = useState<boolean>(false);
  const [form, setForm] = useState<formProps>({
    opened: false,
    checked: false,
    form: {
      limit: 5,
      requiredWords: [],
      acceptedDeviation: 1000,
      minNumComments: 0,
      state: "closed",
    },
  });
  const [data, setData] = useState<IssueJSON[]>([]);

  const { searchIssues } = useSearchIssues({
    params: { url: collectionUrl, message: text },
    setData,
  });

  const { advancedSearchIssues } = useAdvancedSearchIssues({
    params: {
      url: collectionUrl,
      message: text,
      limit: form.form.limit,
      requiredWords: form.form.requiredWords,
      acceptedDeviation: form.form.acceptedDeviation,
      minNumComments: form.form.minNumComments,
      state: form.form.state,
    },
    setData,
  });
  useEffect(() => {
    if (request) {
      if (form.checked) {
        advancedSearchIssues();
      } else {
        searchIssues();
      }
      setRequest(false);
      setText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  return (
    <Chat
      collectionUrl={collectionUrl}
      form={form}
      setForm={setForm}
      data={data}
      setRequest={setRequest}
      text={text}
      setText={setText}
    />
  );
}
