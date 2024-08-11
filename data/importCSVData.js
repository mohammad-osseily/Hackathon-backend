import fs from 'fs';
import csv from 'csv-parser';
import databaseConnection from '../connection.js'; // Adjust path as necessary
import App from '../models/App.js';

const csvFilePath = 'C:/Users/1/Downloads/data/googleplaystore.csv'; // Use the correct path

export const saveCSVData = async () => {
  await databaseConnection(); // Ensure database connection is established

  const apps = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Parse the date and handle invalid dates
      const lastUpdatedDate = new Date(row['Last Updated']);
      const validDate = !isNaN(lastUpdatedDate.getTime()) ? lastUpdatedDate : new Date('1970-01-01'); // Fallback to a default date if invalid

      apps.push({
        app: row.App || 'Unknown',
        category: row.Category || 'Uncategorized',
        rating: row.Rating ? parseFloat(row.Rating) : 0, // Default to 0 if missing
        reviews: row.Reviews ? parseInt(row.Reviews) : 0, // Default to 0 if missing
        size: row.Size || 'Unknown',
        installs: row.Installs || 'Unknown',
        type: ['Free', 'Paid'].includes(row.Type) ? row.Type : 'Free', // Default to 'Free' if invalid
        price: row.Price || '0.0', // Default to '0.0' if missing
        contentRating: row['Content Rating'] || 'Not Rated',
        genres: row.Genres || 'Unknown',
        lastUpdated: validDate,
        currentVer: row['Current Ver'] || 'Unknown',
        androidVer: row['Android Ver'] || 'Unknown',
      });
    })
    .on('end', async () => {
      try {
        await App.insertMany(apps);
        console.log('Data successfully imported to MongoDB');
        process.exit(0); // Exit process with success
      } catch (err) {
        console.error('Error inserting data into MongoDB:', err);
        process.exit(1); // Exit process with failure
      }
    });
};

