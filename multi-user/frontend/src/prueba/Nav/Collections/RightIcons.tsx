import { ActionIcon } from "@mantine/core";
import { MdDeleteForever } from "react-icons/md";
import { PiLinkBold } from "react-icons/pi";
import { getGitHubURL } from "../../../utils/urlHelpers";
import { Collection } from "../../../models/Collection";
import { MdOutlineShare } from "react-icons/md";

type RightIconsProps = {
  collection: Collection;
  setDeleteModalOpened: (opened: boolean) => void;
  setShareModalOpened: (opened: boolean) => void;
};

export function RightIcons({
  collection,
  setDeleteModalOpened,
  setShareModalOpened,
}: RightIconsProps) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      <ActionIcon
        variant="subtle"
        size="md"
        onClick={() => setShareModalOpened(true)}
        color="green"
      >
        <MdOutlineShare />
      </ActionIcon>
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
          const urlToOpen = getGitHubURL(collection.url, collection.platform);
          if (!urlToOpen) {
            return;
          }
          window.open(urlToOpen, "_blank");
        }}
      >
        <PiLinkBold />
      </ActionIcon>
    </div>
  );
}
