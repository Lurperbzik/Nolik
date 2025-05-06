import { useEffect, useState } from "react";
import {
  Text,
  Alert,
  Box,
  Skeleton,
  NavLink,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { MdInsertInvitation } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { useGetInvitations } from "../../services/requests/Invitation/get";
import { CollectionInvitation } from "../../models/Invitation";
import { FaCheckCircle } from "react-icons/fa";
import { PlatformIcon } from "../NavLink/NavLink";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AcceptInvitation } from "../Invitations/Accept";
import { DeclineInvitation } from "../Invitations/Decline";

function InvitationsHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <MdInsertInvitation size="22px" color="#555" />
        <Text fw={600} size="lg" style={{ marginTop: "2px", color: "#333" }}>
          Invitations
        </Text>
      </div>
    </div>
  );
}

export function NavInvitations() {
  const [invitations, setInvitations] = useState<CollectionInvitation[]>([]);
  const { loading, error, getInvitations } = useGetInvitations({
    setInvitations,
  });
  const [acceptModalOpened, setAcceptModalOpened] = useState(false);
  const [declineModalOpened, setDeclineModalOpened] = useState(false);

  useEffect(() => {
    getInvitations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <InvitationsHeader />
        <Alert title="Error" icon={<MdErrorOutline size={"xl"} />} color="red">
          Failed to load invitations, please try again later.
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <InvitationsHeader />
        <Box>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Box>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <InvitationsHeader />
      <Box>
        {invitations.map((inv) => (
          <div key={inv.url}>
            <AcceptInvitation
              invitation={inv}
              opened={acceptModalOpened}
              onClose={() => setAcceptModalOpened(false)}
            />
            <DeclineInvitation
              invitation={inv}
              opened={declineModalOpened}
              onClose={() => setDeclineModalOpened(false)}
            />
            <NavLink
              label={inv.name}
              leftSection={<PlatformIcon platform={inv.platform} />}
              rightSection={
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
              }
            />
          </div>
        ))}
      </Box>
    </div>
  );
}
