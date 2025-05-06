import React, { useEffect, useMemo, useState } from "react";
import { CollectionContext } from "./CollectionContext";
import { Collection } from "../../models/Collection";
import { useGetCollections } from "../../services/requests/Collection/get";
import { useAuthContext } from "../auth/AuthContext";

interface CollectionContextProviderProps {
  children: React.ReactNode;
}

export default function CollectionContextProvider({
  children,
}: CollectionContextProviderProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [prevCollections, setPrevCollections] = useState<Collection[]>([]);

  const { loading, error, getCollections } = useGetCollections({
    setCollections: setPrevCollections,
  });
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (prevCollections.length > 0) {
      const orderedCollections = prevCollections.sort((a, b) => {
        if (a.status === "completed" && b.status !== "completed") return -1;
        if (b.status === "completed" && a.status !== "completed") return 1;
        return a.name.localeCompare(b.name);
      });
      setCollections(orderedCollections);
    }
  }, [prevCollections]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchCollections = async () => {
        await getCollections();
      };
      fetchCollections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      loading: !!loading,
      error: !!error,
      collections,
      setCollections,
    }),
    [loading, error, collections]
  );

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}
