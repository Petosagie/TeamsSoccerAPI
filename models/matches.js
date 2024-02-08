const mongoose = require('mongoose');

//matches mongoose schema for queries
const matchSchema = new mongoose.Schema({

  Match_ID: {
    type: String,
    message: 'Match_ID must be a string starting with "M" followed by exactly 3 digits, like "M012".',
  },
  Match_Date: {
    type: Date,
    message: "Date must be a date.",
  },
  Teams_Involved: {
    type: Array,
    message: 'Teams_Involved must be an array of two strings, each with exactly 3 digits, like "CHE".'
  },
  Score: {
    type: String,
    message: 'Score must be a string in the format "MAN-LIV", like "3-1".'
  },
  Stadium: {
    type: String,
    message: "Stadium must be a string of not more than 25 characters."
  },

  Goals: {
    type: Array,
    message: 'Goals must be an array of objects with the following properties: Player_ID: string starting with "P" followed by exactly 3 digits, Time: string representing a number between 0 and 90 composed of 2 digits, like "15"'
  }
  
});

const Matches = mongoose.model('matches', matchSchema);

module.exports = Matches;