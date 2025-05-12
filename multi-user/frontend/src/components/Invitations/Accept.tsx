import { Button, Modal, Text, Space } from "@mantine/core";
import { CollectionInvitation } from "../../models/InvitationOld";
import { useAcceptInvitation } from "../../services/requests/Invitation/accept";

type AcceptInvitationProps = {
  invitation: CollectionInvitation;
  opened: boolean;
  onClose: () => void;
};

export function AcceptInvitation({
  invitation,
  opened,
  onClose,
}: AcceptInvitationProps) {
  const { acceptInvitation } = useAcceptInvitation({
    invitation,
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw="bold">
          Accept Invitation
        </Text>
      }
      centered
      fw="bold"
    >
      <Text style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
        Are you sure you want to accept{" "}
        <Text component="span" c="blue" fw="bold">
          {invitation.name}
        </Text>{" "}
        invitation?
      </Text>
      <Space h="md" />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="filled"
          color="green"
          onClick={() => {
            acceptInvitation();
            onClose();
          }}
        >
          Accept
        </Button>
      </div>
    </Modal>
  );
}
