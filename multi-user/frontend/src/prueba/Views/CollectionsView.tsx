import { useState } from "react";
import { NavCollections } from "../Nav/Collections/NavCollections";
import { DeleteCollectionModalContainer } from "../Modal/Collections/Delete/DeleteModalContainer";
import { Collection } from "../../models/Collection";
import { User } from "../../models/User";
import { ShareCollectionModalContainer } from "../Modal/Collections/Share/ShareModalContainer";

interface CollectionsViewProps {
  collections: Collection[];
  users: User[];
  activeCollection: Collection | undefined;
  setActiveCollection: React.Dispatch<
    React.SetStateAction<Collection | undefined>
  >;
}
export function CollectionsView({
  collections,
  users,
  activeCollection,
  setActiveCollection,
}: CollectionsViewProps) {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [shareModalOpened, setShareModalOpened] = useState(false);

  return (
    <>
      <NavCollections
        collections={collections}
        setActive={setActiveCollection}
        active={activeCollection}
        addModalOpened={addModalOpened}
        setAddModalOpened={setAddModalOpened}
        setDeleteModalOpened={setDeleteModalOpened}
        setShareModalOpened={setShareModalOpened}
      />
      <DeleteCollectionModalContainer
        collection={activeCollection}
        opened={deleteModalOpened}
        setOpened={setDeleteModalOpened}
      />
      <ShareCollectionModalContainer
        activeCollection={activeCollection}
        users={users}
        setOpened={setShareModalOpened}
        opened={shareModalOpened}
      />
    </>
  );
}
