import { useState, useRef, useEffect } from "react";
import {
  Divider,
  Card,
  Textarea,
  Tooltip,
  ActionIcon,
  Switch,
  Space,
} from "@mantine/core";
import { MdOutlineEditNote } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Issues } from "../Issues/Issues";
import { UserInput } from "./UserInput";
import { IssueJSON } from "../../models/Issue";
import { ModalOptions, formProps } from "../Modal/SearchOptions/ModalOptions";

interface ChatProps {
  collectionUrl: string;
  form: formProps;
  setForm: React.Dispatch<React.SetStateAction<formProps>>;
  data: IssueJSON[];
  setRequest: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export function Chat({
  collectionUrl,
  form,
  setForm,
  data,
  setRequest,
  text,
  setText,
}: ChatProps) {
  const [messages, setMessages] = useState<React.ReactNode>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState<React.ReactNode>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.shiftKey)) {
      event.preventDefault();
      setText((prevText: string) => prevText + "\n");
    } else if (event.key === "Enter") {
      event.preventDefault();

      const newMessage = UserInput({ message: text });
      if (!newMessage) {
        return;
      }
      setInput(newMessage);
      setRequest(true);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (data) {
      setMessages(<Issues data={data} />);
    }
  }, [data]);

  useEffect(() => {
    setMessages(null);
    setInput(null);
  }, [collectionUrl]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            maxWidth: "1600px",
          }}
        >
          {input}
          <Space h="md" />
          <Space h="md" />
          {messages}
        </div>
        <div ref={messagesEndRef} style={{ height: "1px" }} />
      </div>
      <Card
        style={{
          backgroundColor: !collectionUrl ? "#f1f3f5" : "#ffffff",
          width: "90%",
          maxWidth: "800px",
          margin: "0 auto 20px auto",
        }}
        withBorder
        radius={"md"}
        shadow={"md"}
      >
        <Textarea
          variant="unstyled"
          disabled={!collectionUrl}
          onKeyDown={handleKeyDown}
          autosize
          minRows={2}
          maxRows={5}
          placeholder="Type your issue..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            transition: "none",
          }}
        />
        <Divider mb="sm" />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <Tooltip
              label="Edit advanced search options"
              color="gray"
              position="top-start"
              opacity={0.8}
            >
              <ActionIcon
                variant="light"
                color="gray"
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
                  color="#347D39"
                  checked={form.checked}
                  style={{ marginTop: "5px" }}
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
              disabled={!collectionUrl || text.length === 0}
              size="lg"
              variant="filled"
              color="gray"
              onClick={() => {
                const newMessage = UserInput({ message: text });
                if (!newMessage) {
                  return;
                }
                setMessages(newMessage);
                setRequest(true);
              }}
            >
              <FaArrowRightToBracket size="24" />
            </ActionIcon>
          </Tooltip>
        </div>
      </Card>
      <ModalOptions form={form} setForm={setForm} />
    </div>
  );
}
