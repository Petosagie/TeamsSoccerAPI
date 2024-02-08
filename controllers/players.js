// Import the Mongoose 
const mongoose = require("mongoose");
const Players = require("../models/players");

const getAllPlayers = async (req, res) => {
  // #swagger.tags=["players"]
  try {
    const PlayersInfo = await Players.find();
    res.status(200).json(PlayersInfo);
  } catch (error) {
    console.error("Error fetching playeres", error);
    
     res.status(400).send("Error fetching playeres");
  }
};

const getPlayerById = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params.Player_ID;

    const singlePlayer = await Players.findOne({ Player_ID: playerId });

    if (!singlePlayer) {
      // If no player is found, respond with a 404 Not Found status
      return res.status(404).json({ error: "Player not found" });
    }
    // Respond with a 200 status to get single player
    res.status(200).json(singlePlayer);
  } catch (error) {
    console.error("Error fetching player by ID:", error);

    // Respond with a 400 
    res.status(400).json({
      error:
        "Error fetching player by ID. ",
    });
  }
};

const getPlayersByPosition = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const position = req.params.Player_Position;
    const playersByPosition = await Players.find({ Player_Position: position });
    res.status(200).json(playersByPosition);
  } catch (error) {
    console.error("Error fetching players by position", error);
    res.status(400).json({
      error: "Error fetching players by position",
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
    const newPlayer = await Players.create(playerInfo);
    res.status(204).json(newPlayer);
  } catch (error) { 
       
    console.error("Error creating player:", error);
    // Respond with a 400  error message
    res.status(400).json({
      error: "Error creating player. ",
    });
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params.Player_ID;
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
    if(updatePlayer.modifiedCount === 0) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(204).json(updatePlayer);
  } catch (error) {
    // Log the detailed error information
    console.error("Error updating player:", error);

   // Respond with a 400 error message
    res.status(400).json({
      error: "Error updating player.",
    });
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params.Player_ID;
    const deletePlayer = await Players.deleteOne({ Player_ID: playerId });
    if (deletePlayer.deletedCount === 0) {
      // If no player is found, respond with a 404 Not Found status
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(204).json(deletePlayer);
  } catch (error) {
    // Log the detailed error information
    console.error("Error deleting player:", error);

    // Respond with a 400 error message
    res.status(400).json({
      error: "Error deleting player.",
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
