const { body, validationResult } = require("express-validator");

const coachValidator = [
  body("Coach_ID", "Coach ID must start with 'C' followed by three numbers")
    .exists()
    .isString()
    .matches(/^C\d{3}$/),
  
  body("Coach_Name", "Coach name is required and must be a string of not more than 25 characters")
    .exists()
    .isString()
    .isLength({ max: 25 }),

  body("Coach_Age", "Coach age is required and must be an integer between 15 and 99")
    .exists()
    .isInt({ min: 15, max: 99 }),

  body("Coach_Nationality", "Coach nationality is required and must be a string of not more than 25 characters")
    .exists()
    .isString()
    .isLength({ max: 25 }),

  body("No_Matches", "Number of matches played is required and must be an integer between 0 and 10000")
    .exists()
    .isInt({ min: 0, max: 10000 }),

  body("Team_ID", "Team ID is required and must be a string of exactly 3 uppercase letters")
    .exists()
    .isString()
    .isLength({ min: 3, max: 3 })
    .matches(/^[A-Z]+$/)
];

const playerValidator = [
  body("Player_ID", "Player ID must start with 'P' followed by three numbers")
    .exists()
    .isString()
    .matches(/^P\d{3}$/),

  body("Player_Name", "Player name is required and must be a string of not more than 25 characters")
    .exists()
    .isString()
    .isLength({ max: 25 }),

  body("Player_Age", "Player age is required and must be an integer between 12 and 99")
    .exists()
    .isInt({ min: 12, max: 99 }),

  body("Player_Height", "Player height is required and must be an integer")
    .exists()
    .isInt(),

  body("Player_Nationality", "Player nationality is required and must be a string of not more than 25 characters")
    .exists()
    .isString()
    .isLength({ max: 25 }),

  body("Player_Position", "Player position is required and must start with Capital Letters and  be one of 'Forward', 'Midfielder', 'Goalkeeper', 'Defender'")
    .exists()
    .isString()
    .isIn(["Forward", "Midfielder", "Goalkeeper", "Defender"]),

  body("Team_ID", "Team ID is required and must be a string of exactly 3 uppercase letters")
    .exists()
    .isString()
    .isLength({ min: 3, max: 3 })
    .matches(/^[A-Z]+$/)
];

const teamValidator = [
  body("Team_ID", "Team ID is required and must be a string of exactly 3 uppercase letters")
    .exists()
    .isString()
    .isLength({ min: 3, max: 3 })
    .matches(/^[A-Z]+$/),

  body("Team_Name", "Team name is required and must be a string of not more than 25 characters")
    .exists()
    .isString()
    .isLength({ max: 25 }),

  body("Venue", "Venue is required and must be a string of not more than 25 characters")
    .exists()
    .isString()
    .isLength({ max: 25 }),

  body("Location", "Location is required and must be a string of not more than 25 characters")
    .exists()
    .isString()
    .isLength({ max: 25 }),

  body("Year_Founded", "Year founded is required and must be an integer")
    .exists()
    .isInt(),

  body("Coach_ID", "Coach ID must start with 'C' followed by three numbers")
    .exists()
    .isString()
    .matches(/^C\d{3}$/)
];

const matchesValidator = [
  body("Match_ID", "Match ID must start with 'M' followed by three numbers")
    .exists()
    .isString()
    .matches(/^M\d{3}$/),

  body("Match_Date", "Match date is required and must be in the format MM-DD-YYYY")
    .exists()
    .isString()
    .matches(/^\d{2}-\d{2}-\d{4}$/),

  body("Score", "Score is required and must be in the format '2-0'")
    .exists()
    .isString()
    .matches(/^\d+-\d+$/),

  body("Stadium", "Stadium is required and must be a string of not more than 25 characters")
    .exists()
    .isString()
    .isLength({ max: 25 }),

  body("Goals", "Goals is required and must be an array")
    .exists()
    .isArray(),

  body("Teams_Involved", "Teams involved is required and must be an array")
    .exists()
    .isArray()
];

module.exports = {
  coachValidator,
  playerValidator,
  teamValidator,
  matchesValidator
};
