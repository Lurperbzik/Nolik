import { Space } from "@mantine/core";
import { CollectionsView } from "./Collections/CollectionsView";
import { NavUsers } from "./Nav/Users/NavUsers";
import { NavInvitations } from "./Nav/Invitations/NavInvitations";

export function Navbar() {
  return (
    <>
      <CollectionsView />
      <Space h="md" />
      <NavUsers />
      <Space h="md" />
      <NavInvitations />
    </>
  );
}
