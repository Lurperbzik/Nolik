import { useDeleteCollection } from "../../services/requests/Collection/delete";
import { Collection } from "../../models/Collection";
import { Button, Modal, Text, Space } from "@mantine/core";

type DeleteCollectionProps = {
  collection: Collection;
  opened: boolean;
  onClose: () => void;
};

export function DeleteCollection({
  collection,
  opened,
  onClose,
}: DeleteCollectionProps) {
  const { deleteCollection } = useDeleteCollection({
    collection,
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw="800" style={{ color: "#333" }}>
          Delete Collection
        </Text>
      }
      fw="bold"
      styles={{
        content: {
          backgroundColor: "#f9f9f9",
        },
        header: {
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #e0e0e0",
        },
      }}
    >
      <Space h="md" />
      <Text
        fw="bold"
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          color: "#333",
        }}
      >
        Are you sure you want to delete{" "}
        <Text component="span" c="blue" fw="bold">
          {collection.name}
        </Text>
      </Text>
      <Space h="md" />
      <Text>
        By continuing, you will lose access to this collection. It will only be
        removed globally if you are the owner.
      </Text>
      <hr
        style={{
          position: "relative",
          left: "-16px",
          width: "calc(100% + 32px)",
          border: "none",
          borderTop: "1px solid #e0e0e0",
        }}
      ></hr>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="filled"
          color="#b5351c"
          onClick={() => {
            deleteCollection();
            onClose();
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
