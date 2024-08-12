import fs from "fs";
import csv from "csv-parser";
import databaseConnection from "../connection.js";
import App from "../models/App.js";

const csvFilePath = "/home/mhmdosseily/Downloads/data/googleplaystore.csv";

export const saveCSVData = async () => {
  await databaseConnection(); // Ensure database connection is established

  try {
    // Delete all existing records
    await App.deleteMany({});
    console.log("Existing data deleted.");

    const apps = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        // Parse the date and handle invalid dates
        const lastUpdatedDate = new Date(row["Last Updated"]);
        const validDate = !isNaN(lastUpdatedDate.getTime())
          ? lastUpdatedDate
          : new Date("1970-01-01"); // Fallback to a default date if invalid

        // Prepare the new app document
        apps.push({
          app: row.App,
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
        });
      })
      .on("end", async () => {
        try {
          // Insert all apps into the collection
          if (apps.length > 0) {
            await App.insertMany(apps);
            console.log("Data successfully imported into MongoDB");
          }
          process.exit(0);
        } catch (err) {
          console.error("Error importing data into MongoDB:", err);
          process.exit(1);
        }
      });
  } catch (err) {
    console.error("Error deleting existing data from MongoDB:", err);
    process.exit(1);
  }
};
