const { MongoClient } = require('mongodb');
const { MONGO_URL } = require('../config');
let client;
async function connectToMongoDB() {
    const uri = MONGO_URL;
    client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB');

    } catch (e) {
        console.error(e);
    }
}

async function getClient() {
    return client;
  }
  
  module.exports = { connectToMongoDB, getClient };
