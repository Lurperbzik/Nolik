import { useEffect } from 'react';
import { useState } from 'react';
import { CollectionsView } from './Views/CollectionsView';
import { useGetCollections } from '../services/requests/Collection/get';
import { WebSocketListener } from '../services/WebSocket';
import { Collection } from '../models/Collection';

interface NavbarProps {
  activeCollection: Collection | undefined;
  setActiveCollection: React.Dispatch<
    React.SetStateAction<Collection | undefined>
  >;
}

export function Navbar({ activeCollection, setActiveCollection }: NavbarProps) {
  const [collections, setCollections] = useState<Collection[]>([]);

  const { getCollections } = useGetCollections({
    setCollections: setCollections,
  });

  useEffect(() => {
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WebSocketListener setCollections={setCollections}>
      <CollectionsView
        collections={collections}
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
      />
    </WebSocketListener>
  );
}
