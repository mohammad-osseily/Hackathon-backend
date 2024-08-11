import fs from "fs";
import csv from "csv-parser";
import databaseConnection from "../connection.js"; // Adjust path as necessary
import App from "../models/App.js";

const csvFilePath = "/home/mhmdosseily/Downloads/data/googleplaystore.csv";

export const saveCSVData = async () => {
  await databaseConnection(); // Ensure database connection is established

  const bulkOps = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      // Parse the date and handle invalid dates
      const lastUpdatedDate = new Date(row["Last Updated"]);
      const validDate = !isNaN(lastUpdatedDate.getTime())
        ? lastUpdatedDate
        : new Date("1970-01-01"); // Fallback to a default date if invalid

      bulkOps.push({
        updateOne: {
          filter: { app: row.App }, // Filter by a unique field like 'app'
          update: {
            $set: {
              category: row.Category || "Uncategorized",
              rating: row.Rating ? parseFloat(row.Rating) : 0,
              reviews: row.Reviews ? parseInt(row.Reviews) : 0,
              size: row.Size || "Unknown",
              installs: row.Installs || "Unknown",
              type: ["Free", "Paid"].includes(row.Type) ? row.Type : "Free",
              price: row.Price || "0.0",
              contentRating: row["Content Rating"] || "Not Rated",
              genres: row.Genres || "Unknown",
              lastUpdated: validDate,
              currentVer: row["Current Ver"] || "Unknown",
              androidVer: row["Android Ver"] || "Unknown",
            },
          },
          upsert: true, // Insert if it doesn't exist
        },
      });
    })
    .on("end", async () => {
      try {
        if (bulkOps.length > 0) {
          await App.bulkWrite(bulkOps);
          console.log("Data successfully imported/updated in MongoDB");
        }
        process.exit(0);
      } catch (err) {
        console.error("Error processing data into MongoDB:", err);
        process.exit(1);
      }
    });
};
