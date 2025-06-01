import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "../context/auth/AuthContext";
import { Collection } from "../models/Collection";
import { Invitation } from "../models/Invitation";
import { User } from "../models/User";

interface WebSocketListenerProps {
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  setSentInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>;
  setReceivedInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  children?: React.ReactNode;
}

export const WebSocketListener: React.FC<WebSocketListenerProps> = ({
  setCollections,
  setReceivedInvitations,
  setSentInvitations,
  setUsers,
  children,
}) => {
  const { token, isAuthenticated } = useAuthContext();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !token || socketRef.current) return;

    const socket = io("http://localhost:3000", {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {});

    socket.on("collections", (payload: Collection[]) => {
      setCollections(payload);
    });

    socket.on("sentInvitations", setSentInvitations);
    socket.on("receivedInvitations", setReceivedInvitations);
    socket.on("users", setUsers);

    socket.on("connect_error", () => {});

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
      socketRef.current = null;
    };
  }, [
    isAuthenticated,
    token,
    setCollections,
    setReceivedInvitations,
    setSentInvitations,
    setUsers,
  ]);

  return <>{children}</>;
};
