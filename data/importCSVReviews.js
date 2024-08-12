import fs from "fs";
import csv from "csv-parser";
import databaseConnection from "../connection.js";
import AppReview from "../models/appReview.js";

const csvFilePath = "C:/Users/1/Downloads/data/googleplaystore_user_reviews.csv";

export const saveReviewsCSV = async () => {
  await databaseConnection();

  try {
    // Delete all existing records
    await AppReview.deleteMany({});
    console.log("Existing reviews deleted.");

    const reviewsByApp = {};

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        const {
          App,
          Translated_Review,
          Sentiment,
          Sentiment_Polarity,
          Sentiment_Subjectivity,
        } = row;

        // If the app doesn't exist in the object, add it
        if (!reviewsByApp[App]) {
          reviewsByApp[App] = [];
        }

        // Push the review to the corresponding app's reviews array
        reviewsByApp[App].push({
          Translated_Review,
          Sentiment,
          Sentiment_Polarity: parseFloat(Sentiment_Polarity),
          Sentiment_Subjectivity: parseFloat(Sentiment_Subjectivity),
        });
      })
      .on("end", async () => {
        try {
          // Prepare the array for bulk insertion
          const bulkInsertArray = Object.entries(reviewsByApp).map(
            ([appName, reviews]) => ({
              appName,  // Assign app name to the appName field
              reviews,
            })
          );

          // Insert all grouped reviews into the collection
          if (bulkInsertArray.length > 0) {
            await AppReview.insertMany(bulkInsertArray);
            console.log("Reviews successfully imported into MongoDB");
          }
          process.exit(0);
        } catch (err) {
          console.error("Error importing reviews into MongoDB:", err);
          process.exit(1);
        }
      });
  } catch (err) {
    console.error("Error deleting existing reviews from MongoDB:", err);
    process.exit(1);
  }
};
