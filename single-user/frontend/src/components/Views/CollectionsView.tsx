import { useState } from 'react';
import { NavCollections } from '../Nav/Collections/NavCollections';
import { DeleteCollectionModalContainer } from '../Modal/Collections/Delete/DeleteModalContainer';
import { Collection } from '../../models/Collection';

interface CollectionsViewProps {
  collections: Collection[];

  activeCollection: Collection | undefined;
  setActiveCollection: React.Dispatch<
    React.SetStateAction<Collection | undefined>
  >;
}
export function CollectionsView({
  collections,
  activeCollection,
  setActiveCollection,
}: CollectionsViewProps) {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  return (
    <>
      <NavCollections
        collections={collections}
        setActive={setActiveCollection}
        active={activeCollection}
        addModalOpened={addModalOpened}
        setAddModalOpened={setAddModalOpened}
        setDeleteModalOpened={setDeleteModalOpened}
      />
      <DeleteCollectionModalContainer
        collection={activeCollection}
        opened={deleteModalOpened}
        setOpened={setDeleteModalOpened}
      />
    </>
  );
}
