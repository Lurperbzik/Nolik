import { Invitation } from "../../../models/Invitation";
import { PiUserCirclePlus } from "react-icons/pi";
import { NavBarItem } from "../Nav";
import { Group, Text, ActionIcon } from "@mantine/core";
import { MdDeleteForever } from "react-icons/md";

const NavInvitedCollectionData: {
  loading: boolean;
  error: boolean;
  rightElement: React.ReactNode[] | undefined;
  navlinkKeyField: keyof Invitation;
  navlinkValueField: keyof Invitation;
  loadingIcon: boolean[];
  activeColorNavlink: boolean;
  autocomplete: boolean;
  autocompletePlaceholder: string;
  active: Invitation | undefined;
} = {
  loading: false,
  error: false,
  rightElement: undefined,
  navlinkKeyField: "invitedUserId",
  navlinkValueField: "invitedUsername",
  loadingIcon: [],
  activeColorNavlink: false,
  autocomplete: false,
  autocompletePlaceholder: "",
  active: undefined,
};

type NavInvitedCollectionProps = {
  invitations: Invitation[];
  setActive: React.Dispatch<React.SetStateAction<Invitation | undefined>>;
  setDeleteModalOpened: (opened: boolean) => void;
  active: Invitation | undefined;
};

export function NavInvitedCollection({
  invitations,
  setActive,
  setDeleteModalOpened,
}: NavInvitedCollectionProps) {
  const leftIcons = invitations.map((inv) => {
    return <PiUserCirclePlus key={inv.invitedUserId} />;
  });

  const rightIcons = invitations.map((inv) => {
    return (
      <Group key={inv.invitedUserId}>
        {inv.status === "pending" ? (
          <Text size="sm" c="orange">
            Pending
          </Text>
        ) : (
          <Text size="sm" c="green">
            Accepted
          </Text>
        )}
        <ActionIcon
          variant="subtle"
          color="red"
          size={22}
          onClick={() => {
            setActive(inv);
            setDeleteModalOpened(true);
          }}
        >
          <MdDeleteForever key={inv.urlCollection} />
        </ActionIcon>
      </Group>
    );
  });

  return (
    <NavBarItem
      data={invitations}
      loading={NavInvitedCollectionData.loading}
      error={NavInvitedCollectionData.error}
      leftElement={leftIcons}
      rightElement={rightIcons}
      loadingIcon={NavInvitedCollectionData.loadingIcon}
      navlinkKeyField={NavInvitedCollectionData.navlinkKeyField}
      navlinkValueField={NavInvitedCollectionData.navlinkValueField}
      activeColorNavlink={NavInvitedCollectionData.activeColorNavlink}
      autocomplete={NavInvitedCollectionData.autocomplete}
      autocompletePlaceholder={NavInvitedCollectionData.autocompletePlaceholder}
      setActive={setActive}
      active={NavInvitedCollectionData.active}
    />
  );
}
