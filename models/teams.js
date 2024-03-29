const mongoose = require('mongoose');

//teamses mongoose schema for queries
const teamSchema = new mongoose.Schema({

  Team_ID: {
    type: String,
    message: 'Team_ID must be a string of exactly 3 digits, like "MAN".',
  },
  Team_Name: {
    type: String,
    message: "Team Name must not be a empty with not more than 25 characters.",
  },

  Venue: {
    type: String,
    message: "Venue must be a string with a maximum length of 25 characters.",

  },
  Location: {
    type: String,
    message: "Location must be a string with no more than 25 characters.",
  },
  Year_Founded: {
    type: Number,
    message: "Year founded  must be a string of exactly 4 integer digits, like '1960'.",
  },
  Coach_ID: {
    type: String,
    message: "Coach_ID must be a string starting with 'C' followed by exactly 3 integer digits, like 'C123'.",
  }
});


const Teams = mongoose.model("teams", teamSchema);

module.exports = Teams;
