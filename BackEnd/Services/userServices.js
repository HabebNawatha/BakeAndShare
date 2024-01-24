const express = require('express');
const { getClient } = require('../db/connection');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');

//DB FINAL names
const APP_NAME = 'Bake&Share';
const USERS_COLLECTION = 'users';

//User Server Message
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from user service!' });
});

// Signup handling
app.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const client = await getClient(); 
    const db = client.db(APP_NAME);
    const collection = db.collection(USERS_COLLECTION);

    const result = await collection.insertOne({ email, password, username });
    res.json({ message: "User registered successfully", insertedId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Signin handling
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await getClient();
    const db = client.db(APP_NAME);
    const collection = db.collection(USERS_COLLECTION);

    const user = await collection.findOne({ email, password });

    if (user) {
      // User found, send a success response
      res.json({ message: "Sign in successful", user });
    } else {
      // User not found, send an error response
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing in" });
  }
});

//Fetch user info
app.get("/userdata/:useremail", async (req, res) => {
  const { useremail } = req.params;
  try {
    const client = await getClient();
    const db = client.db(APP_NAME);
    const collection = db.collection(USERS_COLLECTION);

    const user = await collection.findOne({ email: useremail });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

module.exports = app;