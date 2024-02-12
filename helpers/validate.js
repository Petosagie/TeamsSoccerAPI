const { body, validationResult } = require("express-validator");

const coachValidator = [

    // Coach_ID
    // Coach_Name
    // Coach_Age
    // Coach_Nationality
    // No_Matches
    // Team_ID

    body("Coach_ID", "Coach ID is required and is a string")
    .exists()
    .isString(),
    body("Coach_Name", "coach name is required and is a string")
    .exists()
    .isString(),
    body("Coach_Age", "coach age is required and is a number")
    .exists()
    .isNumeric(),
    body("Coach_Nationality", "coach nationality is required and is a string")
    .exists()
    .isString(),
    body("No_Matches", "matches are required and is a string")
    .exists()
    .isString(),
    body("Team_ID", "team ID is required and is a string")
    .exists()
    .isString()
  ]

  const playerValidator = [
    
// Player_ID
// Player_Name
// Player_Age
// Player_Height
// Player_Nationality
// Player_Position
// Team_ID

    body("Player_ID", "player ID is required and is a string")
    .exists()
    .isString(),
    body("Player_Name", "player name is required and is a string")
    .exists()
    .isString(),
    body("Player_Age", "player age is required and must be a number")
    .exists()
    .isNumeric(),
    body("Player_Height", "player height is required and must be a number")
    .exists()
    .isNumeric(),
    body("Player_Nationality", "player nationality is required and must be a string")
    .exists()
    .isString(),
    body("Player_Position", "player position is required and must be a string")
    .exists()
    .isString(),
    body("Team_ID", "team ID is required and must be a string")
    .exists()
    .isString()
  ]

  const teamValidator = [
    
// Team_ID
// Team_Name
// Venue
// Location
// Year_Founded
// Coach_ID

    body("Team_ID", "team ID is required and must be a string")
    .exists()
    .isString(),
    body("Team_Name", "team name is required and must be a string")
    .exists()
    .isString(),
    body("Venue", "venue is required and must be a string")
    .exists()
    .isString(),
    body("Location", "location is required and must be a string")
    .exists()
    .isString(),
    body("Year_Founded", "foundation is required and is a number")
    .exists()
    .isNumeric(),
    body("Coach_ID", "coach id is required and must be a string")
    .exists()
    .isString()
  ]

  const matchesValidator = [
    
// Match_ID
// Match_Date
// Score
// Stadium
// Goals
// Teams_Involved

    body("Match_ID", "match ID is required and is a string")
    .exists()
    .isString(),
    body("Match_Date", "match date is required and is a string")
    .exists()
    .isString(),
    body("Score", "score is required and is a string")
    .exists()
    .isString(),
    body("Stadium", "stadium is required and is a string")
    .exists()
    .isString(),
    body("Goals", "goals is required and is a string")
    .exists()
    .isArray(),
    body("Teams_Involved", "teams involved is required and is a string")
    .exists()
    .isArray()
  ]

module.exports = {
    coachValidator,
    playerValidator,
    teamValidator,
    matchesValidator
}