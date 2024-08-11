import express, { json } from "express";
import dotenv from "dotenv";
import databaseConnection from "./connection.js";
import userRoutes from "./routes/user.routes.js";
import aiRequestRoutes from "./routes/aiRequest.routes.js";
import aiResponsetRoutes from "./routes/aiResponse.routes.js";
import appDataRoutes from "./routes/appData.routes.js"

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
