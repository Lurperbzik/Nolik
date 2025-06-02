import express from "express";
import pkg from "../package.json";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import collectionRouter from "./routes/collection.routes";
import invitationRouter from "./routes/invitation.routes";
import githubRouter from "./routes/github.routes";
import searchRouter from "./routes/search.routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    version: pkg.version,
  });
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/collections", collectionRouter);
app.use("/invitations", invitationRouter);
app.use("/github", githubRouter);
app.use("/search", searchRouter);

export default app;
