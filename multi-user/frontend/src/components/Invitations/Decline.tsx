import { Button, Modal, Text, Space } from "@mantine/core";
import { CollectionInvitation } from "../../models/Invitation";
import { useDeclineInvitation } from "../../services/requests/Invitation/decline";
type DeclineInvitationProps = {
  invitation: CollectionInvitation;
  opened: boolean;
  onClose: () => void;
};

export function DeclineInvitation({
  invitation,
  opened,
  onClose,
}: DeclineInvitationProps) {
  const { declineInvitation } = useDeclineInvitation({
    invitation,
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw="bold">
          Decline Invitation
        </Text>
      }
      centered
      fw="bold"
    >
      <Text style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
        Are you sure you want to decline{" "}
        <Text component="span" c="blue" fw="bold">
          {invitation.name}
        </Text>{" "}
        invitation?
      </Text>
      <Space h="md" />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="filled"
          color="red"
          onClick={() => {
            declineInvitation();
            onClose();
          }}
        >
          Decline
        </Button>
      </div>
    </Modal>
  );
}
