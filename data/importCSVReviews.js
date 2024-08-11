import fs from 'fs';
import csv from 'csv-parser';
import databaseConnection from '../connection.js';
import appReview from '../models/appReview.js';

const csvFilePath = 'C:/Users/1/Downloads/data/googleplaystore_user_reviews.csv';

export const saveReviewsCSV = async()=>{
    await databaseConnection()

    const reviewsByApp = {};

    fs.createReadStream(csvFilePath)  
      .pipe(csv())
      .on('data', (row) => {
        const { App, Translated_Review, Sentiment, Sentiment_Polarity, Sentiment_Subjectivity } = row;
    
        if (!reviewsByApp[App]) {
          reviewsByApp[App] = [];
        }
    
        reviewsByApp[App].push({
          Translated_Review,
          Sentiment,
          Sentiment_Polarity,
          Sentiment_Subjectivity
        });
      })
    .on('end', async () => {
        console.log('CSV file successfully processed.')

        const apps = Object.entries(reviewsByApp).map(([appName, reviews]) => {
            return { [appName]: reviews };
          });
          try {
            await appReview.insertMany(apps);
            console.log('Data successfully imported to MongoDB');
            process.exit(0); 
          } catch (err) {
            console.error('Error inserting data into MongoDB:', err);
            process.exit(1); 
          }
    });


}

