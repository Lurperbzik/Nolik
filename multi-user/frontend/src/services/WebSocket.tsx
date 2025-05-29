import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
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
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const socket = io("http://localhost:3000", {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket conectado");
    });

    socket.on("collections", (payload: Collection[]) => {
      console.log("Collections received:", payload);
      setCollections(payload);
    });

    socket.on("invitations", setInvitations);
    socket.on("users", setUsers);
    socket.on("collection-invitations", setCollectionInvitations);

    socket.on("connect_error", (err: Error) => {
      console.error("Socket connection error:", err.message);
    });

    // Cleanup solo al desmontar el componente (no al recargar sin cerrar sesión)
    return () => {
      console.log("⛔ Desmontando socket");
      socket.disconnect();
    };
  }, [
    isAuthenticated,
    token,
    setCollections,
    setInvitations,
    setUsers,
    setCollectionInvitations,
  ]);

  return <>{children}</>;
};
