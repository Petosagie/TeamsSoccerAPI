const mongoose = require('mongoose');

// Coaches mongoose schema for queries
const coachSchema = new mongoose.Schema({
  Coach_ID: {
    type: String,
    // Validation message for Coach_ID
    message: "String starting with 'C' followed by exactly 3 digits",
  },
  Coach_Names: {
    type: String,
    // Validation message for Coach_Names
    message: "Name of coach must be a string of not more than 25 characters.",
  },
  Coach_Age: {
    type: Number,
    // Validation message for Coach_Age
    message: "Age should be an integer.",
  },
  Coach_Nationality: {
    type: String,
    // Validation message for Coach_Nationality
    message: "Nationality should be a string of not more than 25 characters.",
  },
  No_Matches: {
    type: Number,
    // Validation message for No_Matches
    message: "Number of Matches must be an integer.",
  },
  Team_ID: {
    type: String,
    // Validation message for Team_ID
    message: 'Team_ID must be a string of exactly 3 digits, like "MAN".',
  }
});

const Coaches = mongoose.model("coaches", coachSchema);

module.exports = Coaches;
