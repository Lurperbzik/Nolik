import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./database/index";
import { setupWebSocket } from "./Sockets/webSocket";
import http from "http";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const server = http.createServer(app);

setupWebSocket(server);

server.listen(PORT, "0.0.0.0", () => {});
