import {
  Skeleton,
  Box,
  Button,
  Autocomplete,
  Alert,
  Text,
} from "@mantine/core";
import { useCollectionContext } from "../../context/collections/CollectionContext";
import { MdErrorOutline } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { ModalContainer } from "../Modal/ModalContainer";
import { Navlink } from "../NavLink/NavLink";

type NavCollectionsProps = {
  setActiveCollectionUrl: (collection: string) => void;
};

function AddButton() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
        loading={loading}
        size="compact-sm"
        variant="filled"
        color="#347D39"
        radius="sm"
        rightSection={<IoAddCircle size={18} />}
        onClick={() => {
          setLoading(true);
        }}
      >
        <Text fw={600} size="md" style={{ marginTop: "2px", color: "#FFFF" }}>
          New
        </Text>
      </Button>
      <ModalContainer opened={loading} setOpened={setLoading} />
    </>
  );
}

function CollectionsHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <FaFolder size="22px" color="#555" />
        <Text fw={600} size="lg" style={{ marginTop: "2px", color: "#333" }}>
          Collections
        </Text>
      </div>
      <AddButton />
    </div>
  );
}

export function NavCollections({
  setActiveCollectionUrl,
}: NavCollectionsProps) {
  const { collections, loading, error } = useCollectionContext();
  const [activeCollection, setActiveCollection] = useState("");
  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <CollectionsHeader />
        <Alert title="Error" icon={<MdErrorOutline size={"xl"} />} color="red">
          Failed to load collections, please try again later.
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <CollectionsHeader />
        <Box>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Box>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <CollectionsHeader />
      <Autocomplete
        data={collections.map((collection) => collection.name)}
        placeholder="Search collection"
        style={{ width: "100%" }}
        onOptionSubmit={(value) => {
          setActiveCollection(value);
          const collection = collections.find(
            (collection) => collection.name === value
          );
          if (collection) {
            setActiveCollectionUrl(collection.url);
          }
        }}
      />
      <Box>
        {collections.map((collection) => (
          <Navlink
            key={collection.url}
            collection={collection}
            onClick={() => {
              setActiveCollection(collection.name);
              setActiveCollectionUrl(collection.url);
            }}
            active={activeCollection === collection.name}
          />
        ))}

        <hr style={{ border: "none", borderTop: "1px solid #e0e0e0" }} />
      </Box>
    </div>
  );
}
