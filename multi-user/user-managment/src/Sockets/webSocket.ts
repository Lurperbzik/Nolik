import { Server, Socket } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import { CollectionManager } from "../Collection/collection.manager";
import { InvitationManager } from "../Invitation/invitation.manager";

interface TokenPayload {
  userId: string;
}
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWTPRIVATEKEY || "defaultSecretKey";

export const connectedUsers = new Map<number, Socket>();
const collectionManager = CollectionManager.getInstance();
const invitationManager = InvitationManager.getInstance();

export function setupWebSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      socket.data.userId = decoded.userId;
      next();
    } catch (err) {
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`🟢 Usuario conectado: ${socket.data.userId}`);
    connectedUsers.set(socket.data.userId, socket);
    collectionManager.getByUserIdFromDB({
      userId: parseInt(socket.data.userId),
    });
    invitationManager.getByUserIdFromDB(parseInt(socket.data.userId));

    socket.on("disconnect", () => {
      console.log(`🔴 Usuario desconectado: ${socket.data.userId}`);
      connectedUsers.delete(socket.data.userId);
      collectionManager.removeFromCacheByUserId({
        userId: parseInt(socket.data.userId),
      });
      invitationManager.removeFromCacheByUserId(parseInt(socket.data.userId));
    });
  });

  return io;
}
