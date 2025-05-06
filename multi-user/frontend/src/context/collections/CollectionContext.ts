import { createContext, useContext } from "react";
import { Collection } from "../../models/Collection";

export const CollectionContext = createContext<{
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  loading?: boolean;
  error?: boolean;
}>({
  collections: [],
  setCollections: () => {},
  loading: false,
  error: false,
});

export function useCollectionContext() {
  return useContext(CollectionContext);
}
