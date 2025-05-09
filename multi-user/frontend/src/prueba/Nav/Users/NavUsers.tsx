import { NavBarItem, Header } from "../Nav";
import { FaUserCircle } from "react-icons/fa"; // header icon
import { PiUserCirclePlus } from "react-icons/pi"; // left icon
import { IconType } from "react-icons";
import { User } from "../../../models/User";

const users = [
  { id: 1, username: "user1" },
  { id: 2, username: "user2" },
  { id: 3, username: "user3" },
];

const NavUsersData: {
  headerTitle: string;
  Icon: IconType;
  loading: boolean;
  error: boolean;
  rightElement: React.ReactNode[] | undefined;
  navlinkKeyField: keyof User;
  navlinkValueField: keyof User;
  loadingIcon: boolean[];
  activeColorNavlink: boolean;
  autocomplete: boolean;
  autocompletePlaceholder: string;
  setActive: React.Dispatch<React.SetStateAction<User | undefined>>;
  active: User | undefined;
} = {
  headerTitle: "Users",
  Icon: FaUserCircle,
  loading: false,
  error: false,
  rightElement: undefined,
  navlinkKeyField: "id",
  navlinkValueField: "username",
  loadingIcon: [],
  activeColorNavlink: false,
  autocomplete: true,
  autocompletePlaceholder: "Search User",
  setActive: () => {},
  active: undefined,
};

export function NavUsers() {
  const leftIcons = users.map((user) => {
    return <PiUserCirclePlus key={user.id} />;
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Header title={NavUsersData.headerTitle} Icon={NavUsersData.Icon} />
      <NavBarItem
        data={users}
        loading={NavUsersData.loading}
        error={NavUsersData.error}
        leftElement={leftIcons}
        rightElement={NavUsersData.rightElement}
        navlinkKeyField={NavUsersData.navlinkKeyField}
        navlinkValueField={NavUsersData.navlinkValueField}
        loadingIcon={NavUsersData.loadingIcon}
        activeColorNavlink={NavUsersData.activeColorNavlink}
        autocomplete={NavUsersData.autocomplete}
        autocompletePlaceholder={NavUsersData.autocompletePlaceholder}
        setActive={NavUsersData.setActive}
        active={NavUsersData.active}
      />
    </div>
  );
}
