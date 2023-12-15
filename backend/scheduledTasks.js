require("dotenv").config();

const { MongoClient } = require('mongodb');
const cron = require('node-cron');

const mongoURI = process.env.MONGO_URI2;
const dbName = 'test';
const collectionsToDelete = ['messages']; // Add the names of the collections you want to delete

async function connectToDatabase() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db(dbName);
}

async function deleteCollections() {
  const db = await connectToDatabase();

  for (const collectionName of collectionsToDelete) {
    try {
      await db.collection(collectionName).deleteMany({});
      console.log(`Deleted all documents in collection: ${collectionName}`);
    } catch (error) {
      console.error(`Error deleting documents in collection ${collectionName}: ${error.message}`);
    }
  }
}


cron.schedule('* * * * *', async () => {
  console.log('Starting scheduled task to delete collections...');
  await deleteCollections();
  console.log('Scheduled task completed.');
});
