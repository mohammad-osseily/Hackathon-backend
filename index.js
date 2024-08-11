import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";

import databaseConnection from "./connection.js";
import userRoutes from "./routes/userRoutes.js";
import aiRequestRoutes from "./routes/aiRequestRoutes.js";
import aiResponsetRoutes from "./routes/aiResponseRoutes.js";
import appDataRoutes from "./routes/appDataRoutes.js";
import { saveCSVData } from "./data/importCSVData.js";
import { saveReviewsCSV } from "./data/importCSVReviews.js";

dotenv.config();

//function to update apps and appReviews collections at midnight
function importDataAndUpdateDB() {
  console.log("Running the import and update process...");

  saveCSVData();
  saveReviewsCSV();
}
cron.schedule("23 00 * * *", () => {
  console.log("Cron job started at midnight");
  importDataAndUpdateDB();
});

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
server.use("/appData", appDataRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  databaseConnection();
});
