import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import App from "../models/App.js";
import databaseConnection from "../connection.js";

// Connect to MongoDB

const csvFilePath =
  "C:/Users/1/Downloads/data/googleplaystore_user_reviews.csv";

const saveCSVData = async () => {
  await databaseConnection();

  const apps = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      apps.push({
        app: row.App,
        category: row.Category,
        rating: parseFloat(row.Rating),
        reviews: parseInt(row.Reviews),
        size: row.Size,
        installs: row.Installs,
        type: row.Type,
        price: row.Price,
        contentRating: row["Content Rating"],
        genres: row.Genres,
        lastUpdated: new Date(row["Last Updated"]),
        currentVer: row["Current Ver"],
        androidVer: row["Android Ver"],
      });
    })
    .on("end", async () => {
      try {
        await App.insertMany(apps);
        console.log("Data successfully imported to MongoDB");
        mongoose.connection.close();
      } catch (err) {
        console.error("Error inserting data into MongoDB:", err);
      }
    });
};

saveCSVData();
