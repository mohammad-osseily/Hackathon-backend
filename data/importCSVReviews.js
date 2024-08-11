import fs from "fs";
import csv from "csv-parser";
import databaseConnection from "../connection.js";
import appReview from "../models/appReview.js";

const csvFilePath =
  "/home/mhmdosseily/Downloads/data/googleplaystore_user_reviews.csv";

export const saveReviewsCSV = async () => {
  await databaseConnection();

  const bulkOps = [];

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

      // We use updateOne with a filter that checks if the review exists.
      bulkOps.push({
        updateOne: {
          filter: { app: App, "reviews.Translated_Review": Translated_Review },
          update: {
            $set: {
              "reviews.$.Sentiment": Sentiment,
              "reviews.$.Sentiment_Polarity": Sentiment_Polarity,
              "reviews.$.Sentiment_Subjectivity": Sentiment_Subjectivity,
            },
          },
          upsert: false, // Do not insert if the review doesn't exist
        },
      });

      // Add the review if it doesn't exist
      bulkOps.push({
        updateOne: {
          filter: {
            app: App,
            reviews: { $not: { $elemMatch: { Translated_Review } } },
          },
          update: {
            $push: {
              reviews: {
                Translated_Review,
                Sentiment,
                Sentiment_Polarity,
                Sentiment_Subjectivity,
              },
            },
          },
          upsert: true, // Insert the app if it doesn't exist
        },
      });
    })
    .on("end", async () => {
      try {
        if (bulkOps.length > 0) {
          await appReview.bulkWrite(bulkOps, { ordered: false });
          console.log("Reviews successfully imported/updated in MongoDB");
        }
        process.exit(0);
      } catch (err) {
        console.error("Error processing reviews into MongoDB:", err);
        process.exit(1);
      }
    });
};
