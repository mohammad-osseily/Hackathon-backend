import express, { json } from "express";
import dotenv from "dotenv";
import databaseConnection from "./connection.js";
import userRoutes from './routes/userRoutes.js'
import aiRequestRoutes from './routes/requestRoutes.js'
import aiResponsetRoutes from './routes/aiResponseRoutes.js'



const server = express();
dotenv.config();
server.use(express.json());

server.use('/users', userRoutes)
server.use('/aiRequest', aiRequestRoutes)
server.use('/aiResponse', aiResponsetRoutes)


server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  databaseConnection();
});
