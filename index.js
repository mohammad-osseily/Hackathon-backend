import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./connection.js";

const server = express();
dotenv.config();


server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  databaseConnection();
});
