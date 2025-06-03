import { DeleteCollectionModal } from './DeleteModal';
import { useDeleteCollection } from '../../../../services/requests/Collection/delete';
import { Collection } from '../../../../models/Collection';

interface DeleteCollectionModalContainerProps {
  collection: Collection | undefined;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export function DeleteCollectionModalContainer({
  collection,
  opened,
  setOpened,
}: DeleteCollectionModalContainerProps) {
  const { deleteCollection } = useDeleteCollection({
    url: collection?.url,
  });

  return (
    <DeleteCollectionModal
      collection={collection}
      opened={opened}
      onClickBottom={() => {
        deleteCollection();
        setOpened(false);
      }}
      onClose={() => setOpened(false)}
    />
  );
}
