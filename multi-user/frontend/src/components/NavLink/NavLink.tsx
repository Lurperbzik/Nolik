import { useState } from "react";
import { NavLink, Loader, ActionIcon } from "@mantine/core";
import { Collection } from "../../models/Collection";
import { IoLogoGithub } from "react-icons/io";
import { SiJirasoftware } from "react-icons/si";
import { MdDeleteForever } from "react-icons/md";
import { PiLinkBold } from "react-icons/pi";
import { getGitHubURL } from "../../utils/urlHelpers";
import { DeleteCollection } from "../Collection/Delete";
import { ShareCollection } from "../Invitations/Share";

type NavlinkProps = {
  collection: Collection;
  active: boolean;
  onClick: () => void;
};

export function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "GitHub":
      return <IoLogoGithub />;
    case "Jira":
      return <SiJirasoftware />;
    default:
      return null;
  }
}

export function Navlink({ collection, active, onClick }: NavlinkProps) {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  if (collection.status === "loading") {
    return (
      <NavLink
        disabled
        label={collection.name}
        active={false}
        leftSection={<PlatformIcon platform={collection.platform} />}
        rightSection={<Loader color="blue" size="sm" />}
      />
    );
  }
  if (collection.status === "completed") {
    return (
      <>
        <DeleteCollection
          opened={deleteModalOpened}
          onClose={() => setDeleteModalOpened(false)}
          collection={collection}
        />
        <NavLink
          label={collection.name}
          onClick={onClick}
          active={active}
          leftSection={<PlatformIcon platform={collection.platform} />}
          rightSection={
            <div style={{ display: "flex", gap: "4px" }}>
              <ShareCollection collection={collection} />
              <ActionIcon
                variant="subtle"
                size="md"
                color="red"
                onClick={() => setDeleteModalOpened(true)}
              >
                <MdDeleteForever />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                size="md"
                onClick={() => {
                  const urlToOpen = getGitHubURL(
                    collection.url,
                    collection.platform
                  );
                  if (!urlToOpen) {
                    return;
                  }
                  window.open(urlToOpen, "_blank");
                }}
              >
                <PiLinkBold />
              </ActionIcon>
            </div>
          }
        />
      </>
    );
  }
}
