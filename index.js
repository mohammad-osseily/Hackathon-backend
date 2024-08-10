import express, { json } from "express";
import dotenv from "dotenv";
import databaseConnection from "./connection.js";
import userRoutes from "./routes/userRoutes.js";
import aiRequestRoutes from "./routes/aiRequestRoutes.js";
import aiResponsetRoutes from "./routes/aiResponseRoutes.js";
import appDataRoutes from "./routes/appDataRoutes.js"

const server = express();
dotenv.config();
server.use(express.json());

server.use("/users", userRoutes);
server.use("/aiRequest", aiRequestRoutes);
server.use("/aiResponse", aiResponsetRoutes);
server.use('/appData', appDataRoutes)

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  databaseConnection();
});
