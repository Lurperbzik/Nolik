import { useState } from "react";
import { NavCollections } from "../Nav/Collections/NavCollections";
import { DeleteCollectionModal } from "../Modal/Collections/DeleteModal";
import { Collection } from "../../models/Collection";

const collectionData = [
  {
    name: "Collection 1",
    platform: "GitHub",
    owner: "User1",
    url: "https://api.github.com/repos/Lurperbzik/Admin3",
    status: "completed",
  },
  {
    name: "Collection 2",
    platform: "Jira",
    owner: "User2",
    url: "https://example.com",
    status: "loading",
  },
  {
    name: "Collection 3",
    platform: "GitHub",
    owner: "User3",
    url: "https://example2.com",
    status: "completed",
  },
  {
    name: "Collection 4",
    platform: "Jira",
    owner: "User4",
    url: "https://example3.com",
    status: "in-progress",
  },
];

export function CollectionsView() {
  const [activeCollection, setActiveCollection] = useState<Collection>();
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [shareModalOpened, setShareModalOpened] = useState(false);

  return (
    <>
      <NavCollections
        collections={collectionData}
        setActive={setActiveCollection}
        active={activeCollection}
        addModalOpened={addModalOpened}
        setAddModalOpened={setAddModalOpened}
        setDeleteModalOpened={setDeleteModalOpened}
        setShareModalOpened={setShareModalOpened}
      />
      <DeleteCollectionModal
        collection={activeCollection} // Pass the collection object here
        opened={deleteModalOpened}
        onClickBottom={() => {
          setDeleteModalOpened(false);
        }}
        onClose={() => {
          setDeleteModalOpened(false);
        }}
      />
    </>
  );
}
