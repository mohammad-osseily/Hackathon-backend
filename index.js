import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import databaseConnection from "./connection.js";
import userRoutes from "./routes/userRoutes.js";
import aiRequestRoutes from "./routes/aiRequestRoutes.js";
import aiResponsetRoutes from "./routes/aiResponseRoutes.js";
dotenv.config();

const server = express();

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:3000", // Adjust based on your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

server.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

server.use("/users", userRoutes);
server.use("/aiRequest", aiRequestRoutes);
server.use("/aiResponse", aiResponsetRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  databaseConnection();
});
