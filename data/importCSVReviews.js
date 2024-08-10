import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import databaseConnection from '../connection.js';
import App from '../models/App.js';

const csvFilePath = 'C:/Users/1/Downloads/data/googleplaystore_user_reviews.csv';

const saveReviewsCSV = async()=>{
    await databaseConnection()

    const appReviews = new Map();

    fs.createReadStream(csvFilePath)  
    .pipe(csv())
    .on('data', (row) => {
        const { App, Translated_Review, Sentiment, Sentiment_Polarity, Sentiment_Subjectivity } = row;

        
        if (!appReviews.has(App)) {
        appReviews.set(App, []);
        }

        
        appReviews.get(App).push({
        Translated_Review,
        Sentiment,
        Sentiment_Polarity,
        Sentiment_Subjectivity
        });
    })
    .on('end', async () => {
        console.log('CSV file successfully processed.');

        for (const [appName, reviews] of appReviews.entries()) {
        try {
            await App.updateOne(
            { app: appName },  // Find by app name
            { $set: { reviews } },  // Update or add the reviews field
            { upsert: true }  // Create the document if it doesn't exist
            );
            console.log(`Updated ${appName} with reviews.`);
        } catch (err) {
            console.error(`Error updating ${appName}:`, err);
        }
        }

        console.log('All documents updated.');
        mongoose.connection.close();
    });


}

saveReviewsCSV()