import { Modal, Space, Text } from "@mantine/core";

type CreateInvitationProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
  activeUser: string;
};

export function CreateInvitation({
  opened,
  setOpened,
  activeUser,
}: CreateInvitationProps) {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Text
          fw={600}
          size="xl"
          style={{
            marginTop: "2px",
            color: "#333",
          }}
        >
          Your invitations to{" "}
          <Text component="span" c="blue" fw="bold">
            {activeUser}
          </Text>{" "}
        </Text>
      }
      size="md"
      overlayProps={{ backgroundOpacity: 0.55 }}
      transitionProps={{ transition: "fade", duration: 100 }}
      styles={{
        content: {
          backgroundColor: "#f9f9f9",
        },
        header: {
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #e0e0e0",
        },
      }}
    >
      <Space h="md" />
      <hr
        style={{
          position: "relative",
          left: "-16px",
          width: "calc(100% + 32px)",
          border: "none",
          borderTop: "1px solid #e0e0e0",
        }}
      ></hr>
    </Modal>
  );
}
