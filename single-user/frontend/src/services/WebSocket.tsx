import React, { useEffect } from 'react';
import { Collection } from '../models/Collection';

const host = import.meta.env.VITE_USER_MANAGEMENT_HOST;
const port = import.meta.env.VITE_USER_MANAGEMENT_PORT;

interface WebSocketListenerProps {
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  children?: React.ReactNode;
}

export const WebSocketListener: React.FC<WebSocketListenerProps> = ({
  setCollections,
  children,
}) => {
  useEffect(() => {
    const uri = `http://${host}:${port}/api/websocket`;

    const socket = new WebSocket(uri);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setCollections(data);
      } catch (error) {
        console.error('Error al procesar el mensaje:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('Error en la conexión WebSocket', error);
    };

    return () => {
      if (socket.readyState === 1) {
        socket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
