import React, { useEffect } from 'react';
import { Repository } from '../models/Repositories';

interface WebSocketProps {
  setRepos: React.Dispatch<React.SetStateAction<Repository[]>>;
}

export const WebSocketComponent: React.FC<WebSocketProps> = ({ setRepos }) => {
  useEffect(() => {
    const uri = 'ws://localhost:8000/api/websocket';

    const socket = new WebSocket(uri);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setRepos(data);
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

  return null;
};
