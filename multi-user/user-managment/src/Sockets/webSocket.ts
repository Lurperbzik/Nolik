import { Server, Socket } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
}
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWTPRIVATEKEY || "defaultSecretKey";

export const connectedUsers = new Map<string, Socket>();

export function setupWebSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    console.log("Middleware de autenticación de WebSocket");
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      socket.data.userId = decoded.userId;
      next();
    } catch (err) {
      console.error("Invalid token:", err);
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`🟢 Usuario conectado: ${socket.data.userId}`);
    connectedUsers.set(socket.data.userId, socket);

    socket.on("disconnect", () => {
      console.log(`🔴 Usuario desconectado: ${socket.data.userId}`);
      connectedUsers.delete(socket.data.userId);
    });
  });

  return io;
}
