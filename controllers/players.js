// Import the Mongoose 
const mongoose = require("mongoose");
const Players = require("../models/players");

const getAllPlayers = async (req, res) => {
  // #swagger.tags=["players"]
  try {
    const PlayersInfo = await Players.find();
    
    if (!PlayersInfo || PlayersInfo.length === 0) {
      // If no players are found, respond with a 404 Not Found status
      return res.status(404).json({ error: "No players found" });
    }
    
    res.status(200).json(PlayersInfo);
  } catch (error) {
    console.error("Error fetching players", error);
    
    res.status(500).json({ error: "Error fetching players" });
  }
};



const getPlayerById = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params.Player_ID;

    // Check if playerId is empty or blank
    if (!playerId) {
      // If playerId is not provided, respond with a 400 Bad Request status
      return res.status(400).json({ error: "Player ID not provided" });
    }

    const singlePlayer = await Players.findOne({ Player_ID: playerId });

    if (!singlePlayer) {
      // If no player is found, respond with a 404 Not Found status
      return res.status(404).json({ error: "Player not found" });
    }
    // Respond with a 200 status to get single player
    res.status(200).json(singlePlayer);
  } catch (error) {
    console.error("Error fetching player by ID:", error);

    // Respond with a 500 Internal Server Error status for unexpected errors
    res.status(500).json({
      error:
        "Error fetching player by ID. Please try again later.",
    });
  }
};

const getPlayersByPosition = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const position = req.params.Player_Position;
    
    // Check if position is empty or blank
    if (!position || position.trim() === '') {
      // If no Position is found, respond with a 400 Bad Request status
      return res.status(400).json({ error: "Player position not provided or invalid" });
    }

    const playersByPosition = await Players.find({ Player_Position: position });           
    
    if (playersByPosition.length === 0) {
      // If no players are found for the provided position, respond with a 404 Not Found status
      return res.status(404).json({ error: "No players found for this position" });
    }
    
    // If players are found, respond with a 200 OK status
    res.status(200).json(playersByPosition);
  } catch (error) {
    console.error("Error fetching players by position", error);
    // If there is an internal server error, respond with a 500 Internal Server Error status
    res.status(500).json({
      error: "Internal Server Error: Error fetching players by position",
    });
  }
};


const createPlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    // Extract player details from the request body
    const playerInfo = {
      Player_ID: req.body.Player_ID,
      Player_Name: req.body.Player_Name,
      Player_Age: req.body.Player_Age,
      Player_Height: req.body.Player_Height,
      Player_Nationality: req.body.Player_Nationality,
      Player_Position: req.body.Player_Position,
      Team_ID: req.body.Team_ID,
    };

    // Check if a player with the same Player_ID already exists
    const existingPlayer = await Players.findOne({ Player_ID: playerInfo.Player_ID });
    if (existingPlayer) {
      // Respond with a 409 Conflict status and an appropriate error message
      return res.status(409).json({ error: "Player with the same ID already exists" });
    }

    const newPlayer = await Players.create(playerInfo);
    // Respond with a 204 No Content status as the player has been successfully created
    res.status(204).json(newPlayer);
  } catch (error) { 
    console.error("Error creating player:", error);
    // Respond with a 500 Internal Server Error status and an appropriate error message
    res.status(500).json({
      error: "Error creating player. Internal Server Error.",
    });
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params.Player_ID;

    // Check if player ID is provided
    if (!playerId) {
      return res.status(400).json({ error: "Player ID not provided" });
    }

    // Extract player details from the request body
    const playerInfo = {
      Player_ID: playerId,
      Player_Name: req.body.Player_Name,
      Player_Age: req.body.Player_Age,
      Player_Height: req.body.Player_Height,
      Player_Nationality: req.body.Player_Nationality,
      Player_Position: req.body.Player_Position,
      Team_ID: req.body.Team_ID,
    };

    const updatePlayer = await Players.replaceOne({ Player_ID: playerId }, playerInfo);
    
    // Check if the player is found and updated
    if (updatePlayer.modifiedCount === 0) {
      return res.status(404).json({ error: "Player not found" });
    }

    // Respond with a 204 No Content status as the player has been successfully updated
    res.status(204).json(updatePlayer);
  } catch (error) {
    // Log the detailed error information
    console.error("Error updating player:", error);

    // Respond with a 500 error message as there was an internal server error
    res.status(500).json({
      error: "Internal server error occurred while updating player",
    });
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params.Player_ID;
    
    // Check if playerId is empty or blank
    if (!playerId) {
      // If playerId is not provided, respond with a 400 Bad Request status
      return res.status(400).json({ error: "Player ID not provided" });
    }

    const deletePlayer = await Players.deleteOne({ Player_ID: playerId });

    // Check if no player is found for deletion
    if (deletePlayer.deletedCount === 0) {
      // If no player is found, respond with a 404 Not Found status
      return res.status(404).json({ error: "Player not found" });
    }

    // Respond with a 204 No Content status, as there's no content to return after deletion
    res.status(204).json(deletePlayer);
  } catch (error) {
    // Log the detailed error information
    console.error("Error deleting player:", error);

    // Respond with a 500 Internal Server Error message
    res.status(500).json({
      error: "Internal Server Error. Please try again later.",
    });
  }
};


module.exports = {
  getPlayersByPosition,
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
