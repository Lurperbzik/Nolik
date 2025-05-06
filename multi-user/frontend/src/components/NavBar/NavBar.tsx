import { Space } from "@mantine/core";
import { NavCollections } from "./NavCollections";
import { NavUsers } from "./NavUsers";
import { NavInvitations } from "./NavInvitations";

type NavBarProps = {
  setActiveCollectionUrl: (collection: string) => void;
};

export function NavBar({ setActiveCollectionUrl }: NavBarProps) {
  return (
    <>
      <NavCollections setActiveCollectionUrl={setActiveCollectionUrl} />
      <Space h="xl" />
      <NavUsers />
      <Space h="xl" />
      <NavInvitations />
    </>
  );
}
