const mongoose = require('mongoose');

//Coaches mongoose schema for queries
const coachSchema = new mongoose.Schema({

  Coach_ID: {
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
  Nationality: {
    type: String,
    message: "Nationality must be a string with no more than 25 characters.",
  },
  Team_ID: {
    type: String,
    message: 'Team_ID must be a string of exactly 3 digits, like "MAN".',
  }
});

const Coaches = mongoose.model("coaches", coachSchema);

module.exports = Coaches;
