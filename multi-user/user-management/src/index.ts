import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./database/index";
import { setupWebSocket } from "./Sockets/webSocket";
import http from "http";

const PORT = process.env.PORT;

const server = http.createServer(app);

setupWebSocket(server);
server.listen(PORT, () => {});
