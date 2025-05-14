import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "../context/auth/AuthContext";
import { Collection } from "../models/Collection";
import { Invitation } from "../models/Invitation";
import { User } from "../models/User";

interface WebSocketListenerProps {
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  setInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>;
  setCollectionInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  children?: React.ReactNode;
}

export const WebSocketListener: React.FC<WebSocketListenerProps> = ({
  setCollections,
  setInvitations,
  setCollectionInvitations,
  setUsers,
  children,
}) => {
  const { token, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const socket = io("http://localhost:3000", {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("collections", (payload: Collection[]) => {
      setCollections(payload);
    });

    socket.on("invitations", (payload: Invitation[]) => {
      setInvitations(payload);
    });

    socket.on("users", (payload: User[]) => {
      setUsers(payload);
    });

    socket.on("collection-invitations", (payload: Invitation[]) => {
      setCollectionInvitations(payload);
    });

    socket.on("connect_error", (err: Error) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [
    token,
    isAuthenticated,
    setCollections,
    setInvitations,
    setUsers,
    setCollectionInvitations,
  ]);

  return <>{children}</>;
};
