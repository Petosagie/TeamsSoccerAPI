const mongoose = require('mongoose');

//Coaches mongoose schema for queries
const coachSchema = new mongoose.Schema({

  Coach_ID: {
    type: String,
    message: "String starting with 'C' followed by exactly 3 digits",
  },
  Full_Names: {
    type: String,
    message: "Full_Names must be a string of not not more than 25 characters.",
  },
  Age: {
    type: Number,
    message: "Age should be an integer.",
  },
  Nationality: {
    type: String,
    message: "Nationality should be a string of not more than 25 characters.",
  },
  No_Matches: {
    type: Number,
    message: "Number of Matches must be an integer.",
  },
  Team_ID: {
    type: String,
    message: 'Team_ID must be a string of exactly 3 digits, like "MAN".',
  }
});

const Coaches = mongoose.model("coaches", coachSchema);

module.exports = Coaches;
