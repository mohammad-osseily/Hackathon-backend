import fs from "fs";
import csv from "csv-parser";
import databaseConnection from "../connection.js";
import appReview from "../models/appReview.js";

const csvFilePath =
  "C:/Users/1/Downloads/data/googleplaystore_user_reviews.csv";

export const saveReviewsCSV = async () => {
  await databaseConnection();

  try {
    // Delete all existing records
    await appReview.deleteMany({});
    console.log("Existing reviews deleted.");

    const reviews = [];

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

        // Prepare the new review document
        reviews.push({
          app: App,
          reviews: [
            {
              Translated_Review,
              Sentiment,
              Sentiment_Polarity,
              Sentiment_Subjectivity,
            },
          ],
        });
      })
      .on("end", async () => {
        try {
          // Insert all reviews into the collection
          if (reviews.length > 0) {
            await appReview.insertMany(reviews);
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