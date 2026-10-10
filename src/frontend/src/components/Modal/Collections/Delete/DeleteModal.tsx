import { CustomModal } from "../../Modal";
import { Collection } from "../../../../models/Collection";
import { useColors } from "../../../../theme/theme.context";

const modalData: {
  modalTextField: keyof Collection;
  title: string;
  text: string;
  textSecondary: string;
  button: boolean;
  buttonText: string;
} = {
  modalTextField: "name",
  title: "Delete",
  text: "Are you sure you want to delete this collection?",
  textSecondary:
    "By continuing, you will lose access to this collection. It will only be removed globally if you are the owner.",
  button: true,
  buttonText: "Delete",
};

type DeleteCollectionModalProps = {
  collection: Collection | undefined;
  opened: boolean;
  onClickBottom: () => void;
  onClose: () => void;
};

export function DeleteCollectionModal({
  collection,
  opened,
  onClickBottom,
  onClose,
}: DeleteCollectionModalProps) {
  const { colors } = useColors();
  if (!collection) {
    return null;
  }
  return (
    <CustomModal
      data={collection}
      modalTextField={modalData.modalTextField}
      opened={opened}
      onClose={onClose}
      setOpened={() => {}}
      title={modalData.title}
      text={modalData.text}
      textSecondary={modalData.textSecondary}
      button={modalData.button}
      buttonText={modalData.buttonText}
      colorButton={colors.deleteCollectionButton}
      onClickBottom={onClickBottom}
    />
  );
}
