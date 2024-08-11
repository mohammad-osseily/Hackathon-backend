import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import App from "../models/App.js";
import databaseConnection from "../connection.js";
import csv from "/home/mhmdosseily/Downloads/data/googleplaystore.csv";
// Connect to MongoDB

const csvFilePath = "/home/mhmdosseily/Downloads/data/googleplaystore.csv";

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
        contentRating: row["Conteurrent Rating"],
        genres: row.Genres,
        lastUpdated: new Date(row["Last Updated"]),
        currentVer: row["Cnt Ver"],
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
