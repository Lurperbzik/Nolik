import { useState } from "react";
import { CustomModal } from "../../Modal";
import { NavInvitedCollection } from "../../../Nav/Invitations/NavInvitedCollection";
import { Invitation } from "../../../../models/Invitation";
import { User } from "../../../../models/User";
import { Collection } from "../../../../models/Collection";
import { NavBarItem } from "../../../Nav/Nav";
import { FaUserCircle } from "react-icons/fa";
import { IconType } from "react-icons";
import { PiUserCirclePlus } from "react-icons/pi"; // left icon
import { FaRegEnvelope } from "react-icons/fa";
import { ActionIcon } from "@mantine/core";
import { DeleteInvitationModal } from "../../Invitations/DeleteModal";
import { CreateInvitationModal } from "../../Invitations/CreateInvitation";

const NavUsersData: {
  headerTitle: string;
  Icon: IconType;
  loading: boolean;
  error: boolean;
  navlinkKeyField: keyof User;
  navlinkValueField: keyof User;
  loadingIcon: boolean[];
  activeColorNavlink: boolean;
  autocomplete: boolean;
  autocompletePlaceholder: string;
} = {
  headerTitle: "Users",
  Icon: FaUserCircle,
  loading: false,
  error: false,
  navlinkKeyField: "id",
  navlinkValueField: "username",
  loadingIcon: [],
  activeColorNavlink: false,
  autocomplete: true,
  autocompletePlaceholder: "Search User",
};

const invitationsModalData: {
  modalTextField: keyof Collection;
  title: string;
  text: string;
  textSecondary: string;
  button: boolean;
  buttonText: string;
  colorButton: string;
} = {
  modalTextField: "name",
  title: "Invitations for",
  text: "",
  textSecondary: "",
  button: false,
  buttonText: "",
  colorButton: "",
};

type ShareCollectionModalProps = {
  invitations: Invitation[];
  users: User[];
  setActiveUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  opened: boolean;
  onClickBottomDeleteInvitation: () => void;
  onClickBottomCreateInvitation: () => void;
  onClose: () => void;
  activeCollection: Collection | undefined;
  activeUser: User | undefined;
};

export function ShareCollectionModal({
  invitations,
  users,
  setActiveUser,
  opened,
  onClickBottomCreateInvitation,
  onClickBottomDeleteInvitation,
  onClose,
  activeCollection,
  activeUser,
}: ShareCollectionModalProps) {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [activeInvitation, setActiveInvitation] = useState<
    Invitation | undefined
  >(undefined);

  if (!activeCollection) {
    return null;
  }

  const leftUserIcons = users.map((user) => {
    return <PiUserCirclePlus key={user.id} />;
  });

  const rightUserIcons = users.map((user) => {
    return (
      <ActionIcon
        key={user.id}
        variant="subtle"
        onClick={() => {
          setActiveUser(user);
          setAddModalOpened(true);
        }}
      >
        <FaRegEnvelope />
      </ActionIcon>
    );
  });

  const endContent = (
    <>
      <NavInvitedCollection
        invitations={invitations}
        setActive={setActiveInvitation}
        setDeleteModalOpened={setDeleteModalOpened}
        active={activeInvitation}
      />
      <NavBarItem
        data={users}
        loading={NavUsersData.loading}
        error={NavUsersData.error}
        leftElement={leftUserIcons}
        rightElement={rightUserIcons}
        navlinkKeyField={NavUsersData.navlinkKeyField}
        navlinkValueField={NavUsersData.navlinkValueField}
        loadingIcon={NavUsersData.loadingIcon}
        activeColorNavlink={NavUsersData.activeColorNavlink}
        autocomplete={NavUsersData.autocomplete}
        autocompletePlaceholder={NavUsersData.autocompletePlaceholder}
        setActive={setActiveUser}
        active={activeUser}
      />
    </>
  );

  return (
    <>
      <CustomModal
        data={activeCollection}
        modalTextField={invitationsModalData.modalTextField}
        opened={opened}
        onClose={onClose}
        setOpened={() => {}}
        title={invitationsModalData.title}
        text={invitationsModalData.text}
        textSecondary={invitationsModalData.textSecondary}
        button={invitationsModalData.button}
        buttonText={invitationsModalData.buttonText}
        colorButton={invitationsModalData.colorButton}
        onClickBottom={() => {}}
        endContent={endContent}
      />
      <DeleteInvitationModal
        invitation={activeInvitation}
        opened={deleteModalOpened}
        onClickBottom={() => {
          setDeleteModalOpened(false);
          onClickBottomDeleteInvitation();
        }}
        onClose={() => setDeleteModalOpened(false)}
      />
      <CreateInvitationModal
        user={activeUser}
        collection={activeCollection}
        opened={addModalOpened}
        onClickBottom={() => {
          setAddModalOpened(false);
          onClickBottomCreateInvitation();
        }}
        onClose={() => setAddModalOpened(false)}
      />
    </>
  );
}
