const express = require('express');
const { getClient } = require('../db/connection');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');

//DB FINAL names
const APP_NAME = 'Bake&Share';
const PIZZA_COLLECTION = 'pizzaRecipes';

//Recipe Server Message
app.get('/message', (req, res) => {
    res.json({ message: 'Hello from recipe service!' });
});

//Fetching recipes from MongoDB
app.get("/recipes", async (req, res) => {
    try {
        const client = await getClient();
        const db = client.db(APP_NAME);
        const collection = db.collection(PIZZA_COLLECTION);

        const recipes = await collection.find({}).toArray();

        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving recipes" });
    }
});

// Fetching recipes by user email from MongoDB
app.get("/recipesbyuser", async (req, res) => {
  try {
    const client = await getClient();
    const db = client.db(APP_NAME);
    const collection = db.collection(PIZZA_COLLECTION);

    // Get the user email from the query parameters
    const userEmail = req.query.email;

    // Check if the user email is provided
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    // Fetch recipes shared by the specified user email
    const recipes = await collection.find({ sharedBy: userEmail }).toArray();

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving recipes" });
  }
});

// Adding recipe
app.post("/addrecipe", async (req, res) => {
  const { recipeName, Ingredients, sharedBy, steps } = req.body;

  try {
    const client = await getClient(); // Get the MongoDB client
    const db = client.db(APP_NAME);
    const collection = db.collection(PIZZA_COLLECTION);
    const currentDate = new Date();
    const result = await collection.insertOne({ recipeName, Ingredients, sharedBy, date: currentDate, steps });
    res.status(200).json({ message: "Recipe created successfully", insertedId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating recipe" });
  }
});

// Fetching recipe info from MongoDB
app.get("/recipe/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    const client = await getClient();
    const db = client.db(APP_NAME);
    const collection = db.collection(PIZZA_COLLECTION);

    const recipe = await collection.findOne({ _id: ObjectId.createFromHexString(recipeId) });
    if (recipe) {
      res.json({ recipe });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
});

//Toggle like for a recipe
app.post("/recipes/toggle-like/:id", async (req, res) => {

  const { id } = req.params;
  const { userId } = req.body;

  try {
    const client = await getClient();
    const db = client.db(APP_NAME);
    const collection = db.collection(PIZZA_COLLECTION);
    const recipe = await collection.findOne({ _id: ObjectId.createFromHexString(id) });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const likedByUser = recipe.likedBy.map(String).includes(String(userId));

    if (likedByUser) {
      collection.updateOne({ _id: new ObjectId(id) }, { $pull: { likedBy: new ObjectId(userId) } })
    } else {
      collection.updateOne({ _id: new ObjectId(id) }, { $addToSet: { likedBy: new ObjectId(userId) } });
    }

    const updatedRecipe = await collection.findOne({ _id: new ObjectId(id) });
    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error toggling like" });
  }
});

//Fetch liked recipes by UserId
app.get("/recipes/liked/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const client = await getClient();
    const db = client.db(APP_NAME);
    const collection = db.collection(PIZZA_COLLECTION);

    const likedRecipes = await collection.find({ likedBy: new ObjectId(userId) }).toArray();
    res.json(likedRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching liked recipes" });
  }
});

module.exports = app;