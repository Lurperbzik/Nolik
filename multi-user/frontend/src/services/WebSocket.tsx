// src/components/WebSocketListener.tsx
import React, { useEffect } from "react";
import { Collection } from "../models/Collection";
import { Invitation } from "../models/Invitation";
import { User } from "../models/User";

interface WebSocketListenerProps {
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  setInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const WebSocketListener: React.FC<
  React.PropsWithChildren<WebSocketListenerProps>
> = ({ setCollections, setInvitations, setUsers, children }) => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/api/websocket");

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "collections":
            setCollections(message.payload);
            break;
          case "invitations":
            setInvitations(message.payload);
            break;
          case "users":
            setUsers(message.payload);
            break;
          default:
            console.warn("Unknown message type:", message.type);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, [setCollections, setInvitations, setUsers]);

  return <>{children}</>;
};
