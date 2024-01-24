const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const { connectToMongoDB } = require('./db/connection');
const PORT = 8000;

const userService = require('./Services/userServices');
const recipeService = require('./Services/recipeServices');

connectToMongoDB();

//routes for each server
app.use('/user', userService);
app.use('/recipe', recipeService);

//Server Message
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

//Port Message
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
