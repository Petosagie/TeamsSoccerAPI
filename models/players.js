const mongoose = require('mongoose');

//playeres mongoose schema for queries
const playerSchema = new mongoose.Schema({

  Player_ID: {
    type: String,
    message: "Ensure that the value is a string starting with 'C' followed by exactly 3 digits",
  },
  Name: {
    type: String,
    message: "Name must be a string with no more than 25 characters.",
  },
  Age: {
    type: Number,
    message: "Age must be an integer.",
  },
  Height: {
    type: Number,
    message: "Nationality must be a string with no more than 25 characters.",
  },
  Nationality: {
    type: String,
    message: 'Height must be a string in the format of exactly three-digit numbers',
  },
  Position: {
    type: String,
    message: "Position must be a string with no more than 25 characters.",
  },
  Team_ID: {
    type: String,
    message: 'Team_ID must be a string of exactly 3 digits, like "LIV".',
  },
});

const Players = mongoose.model("players", playerSchema);

module.exports = Players;
