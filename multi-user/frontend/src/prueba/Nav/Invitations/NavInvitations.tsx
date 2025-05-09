import { useState } from "react";
import { NavBarItem, Header } from "../Nav";
import { MdInsertInvitation } from "react-icons/md";
import { PlatformIcon } from "../Collections/PlatformIcon";
import { RightIcons } from "./RightIcons";
import { CollectionInvitation } from "../../../models/Invitation";
import { IconType } from "react-icons";

const invitations = [
  {
    name: "Collection 1",
    owner: "User1",
    platform: "GitHub",
    url: "https://api.github.com/repos/Lurperbzik/Admin3",
    invitedUserId: 1,
    invitedByUserId: 2,
    collectionId: 1,
    status: "completed",
  },
  {
    name: "Collection 2",
    owner: "User2",
    platform: "Jira",
    url: "https://example2.com",
    invitedUserId: 2,
    invitedByUserId: 1,
    collectionId: 2,
    status: "loading",
  },
  {
    name: "Collection 3",
    owner: "User3",
    platform: "GitHub",
    url: "https://example.com",
    invitedUserId: 3,
    invitedByUserId: 1,
    collectionId: 3,
    status: "completed",
  },
];

const NavInvitationsData: {
  headerTitle: string;
  Icon: IconType;
  loading: boolean;
  error: boolean;
  navlinkKeyField: keyof CollectionInvitation;
  navlinkValueField: keyof CollectionInvitation;
  loadingIcon: boolean[];
  activeColorNavlink: boolean;
  autocomplete: boolean;
  autocompletePlaceholder: string;
  setActive: React.Dispatch<
    React.SetStateAction<CollectionInvitation | undefined>
  >;
  active: CollectionInvitation | undefined;
} = {
  headerTitle: "Invitations",
  Icon: MdInsertInvitation,
  loading: false,
  error: false,
  navlinkKeyField: "url",
  navlinkValueField: "name",
  loadingIcon: [],
  activeColorNavlink: false,
  autocomplete: false,
  autocompletePlaceholder: "",
  setActive: () => {},
  active: undefined,
};

export function NavInvitations() {
  const [activeAccept, setActiveAccept] = useState(false);
  const [activeDecline, setActiveDecline] = useState(false);

  const leftIcons = invitations.map((inv) => {
    return (
      <PlatformIcon
        platform={inv.platform}
        key={inv.url + "-" + inv.invitedByUserId}
      />
    );
  });

  const rightIconsComponent = invitations.map((inv) => {
    return (
      <RightIcons
        key={inv.url + "-" + inv.invitedByUserId}
        setDeclineModalOpened={setActiveDecline}
        setAcceptModalOpened={setActiveAccept}
      />
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Header
        title={NavInvitationsData.headerTitle}
        Icon={NavInvitationsData.Icon}
      />
      <NavBarItem
        data={invitations}
        loading={NavInvitationsData.loading}
        error={NavInvitationsData.error}
        leftElement={leftIcons}
        rightElement={rightIconsComponent}
        navlinkKeyField={NavInvitationsData.navlinkKeyField}
        navlinkValueField={NavInvitationsData.navlinkValueField}
        loadingIcon={NavInvitationsData.loadingIcon}
        activeColorNavlink={NavInvitationsData.activeColorNavlink}
        autocomplete={NavInvitationsData.autocomplete}
        autocompletePlaceholder={NavInvitationsData.autocompletePlaceholder}
        setActive={NavInvitationsData.setActive}
        active={NavInvitationsData.active}
      />
    </div>
  );
}
