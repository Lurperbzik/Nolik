import { NavBarItem, Header } from "../Nav";
import { MdInsertInvitation } from "react-icons/md";
import { PlatformIcon } from "../Collections/PlatformIcon";
import { RightIcons } from "./RightIcons";
import { IconType } from "react-icons";
import { Invitation } from "../../../models/Invitation";

const NavInvitationsData: {
  headerTitle: string;
  Icon: IconType;
  loading: boolean;
  error: boolean;
  navlinkKeyField: keyof Invitation;
  navlinkValueField: keyof Invitation;
  loadingIcon: boolean[];
  activeColorNavlink: boolean;
  autocomplete: boolean;
  autocompletePlaceholder: string;
} = {
  headerTitle: "Invitations",
  Icon: MdInsertInvitation,
  loading: false,
  error: false,
  navlinkKeyField: "urlCollection",
  navlinkValueField: "nameCollection",
  loadingIcon: [],
  activeColorNavlink: false,
  autocomplete: false,
  autocompletePlaceholder: "",
};

type NavInvitationsProps = {
  invitations: Invitation[];
  setActive: React.Dispatch<React.SetStateAction<Invitation | undefined>>;
  active: Invitation | undefined;
  setAcceptModalOpened: (opened: boolean) => void;
  setDeclineModalOpened: (opened: boolean) => void;
};

export function NavInvitations({
  invitations,
  setActive,
  active,
  setAcceptModalOpened,
  setDeclineModalOpened,
}: NavInvitationsProps) {
  const PlatformIcons = invitations.map((inv) => {
    return (
      <PlatformIcon key={inv.urlCollection} platform={inv.platformCollection} />
    );
  });

  const RightIconsComponent = invitations.map((inv) => {
    return (
      <RightIcons
        key={inv.urlCollection}
        setDeclineModalOpened={setDeclineModalOpened}
        setAcceptModalOpened={setAcceptModalOpened}
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
        leftElement={PlatformIcons}
        rightElement={RightIconsComponent}
        navlinkKeyField={NavInvitationsData.navlinkKeyField}
        navlinkValueField={NavInvitationsData.navlinkValueField}
        loadingIcon={NavInvitationsData.loadingIcon}
        activeColorNavlink={NavInvitationsData.activeColorNavlink}
        autocomplete={NavInvitationsData.autocomplete}
        autocompletePlaceholder={NavInvitationsData.autocompletePlaceholder}
        setActive={setActive}
        active={active}
      />
    </div>
  );
}
