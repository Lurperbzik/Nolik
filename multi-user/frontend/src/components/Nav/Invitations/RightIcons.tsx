import { Tooltip, ActionIcon } from "@mantine/core";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

type RightIconsProps = {
  setDeclineModalOpened: (opened: boolean) => void;
  setAcceptModalOpened: (opened: boolean) => void;
};

export function RightIcons({
  setDeclineModalOpened,
  setAcceptModalOpened,
}: RightIconsProps) {
  return (
    <>
      <Tooltip
        label="Decline"
        refProp="ref"
        position="top-start"
        color="gray"
        opacity={0.8}
        transitionProps={{ duration: 10 }}
        onClick={() => setDeclineModalOpened(true)}
      >
        <ActionIcon variant="subtle" color="red">
          <AiOutlineCloseCircle size="18px" />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label="Accept"
        refProp="ref"
        position="top-start"
        color="gray"
        opacity={0.8}
        transitionProps={{ duration: 10 }}
        onClick={() => setAcceptModalOpened(true)}
      >
        <ActionIcon variant="subtle">
          <FaCheckCircle color="green" />
        </ActionIcon>
      </Tooltip>
    </>
  );
}
