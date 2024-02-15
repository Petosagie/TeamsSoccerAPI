// Import the Mongoose Library
const mongoose = require("mongoose");
const Teams = require("../models/teams");

const getAllTeams = async (req, res) => {
  // #swagger.tags=["teams"]
  try {
    const TeamsInfo = await Teams.find();

    if (!TeamsInfo || TeamsInfo.length === 0) {
      // If no teams are found, respond with a 404 Not Found status
      return res.status(404).json({ error: "No teams found" });
    }

    res.status(200).json(TeamsInfo);
  } catch (error) {
    console.error("Error fetching teams", error);

    // If there is a server error, respond with a 500 Internal Server Error status
    res.status(500).send("Internal Server Error");
  }
};


const getTeamById = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamId = req.params.Team_ID;
    
    // Check if the Team ID is empty or blank
    if (!teamId) {
      return res.status(400).json({ error: "Team ID is required" });
    }
    
    const singleTeam = await Teams.findOne({ Team_ID: teamId });

    // Check if the Team is in the database
    if (!singleTeam) {
      return res.status(404).json({ error: "Team with this ID not found" });
    }

    // Return the team details if found
    res.status(200).json(singleTeam);
  } catch (error) {
    console.error("Error fetching team:", error);
    // If there's an internal server error, return 500 status with an error message
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const createTeam = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamExists = await Teams.findOne({ Team_ID: req.body.Team_ID });
    if (teamExists) {
      return res.status(400).json({ error: "Team with the same Team_ID already exists." });
    }

    const teamInfo = {
      Team_ID: req.body.Team_ID,
      Team_Name: req.body.Team_Name,
      Venue: req.body.Venue,
      Location: req.body.Location,
      Year_Founded: req.body.Year_Founded,
      Coach_ID: req.body.Coach_ID
    };
    
    const newTeam = await Teams.create(teamInfo);
    res.status(204).json(newTeam);
    console.log(newTeam);
  } catch (error) {
    // Log the detailed error information
    console.error("Error creating team:", error);

    // Respond with a 400  error message
    res.status(400).json({
      error: "Error creating team. ",
    });
  }
};


const updateTeam = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamId = req.params.Team_ID;
    const teamInfo = {
      Team_ID: teamId,
      Team_Name: req.body.Team_Name,
      Venue: req.body.Venue,
      Location: req.body.Location,
      Year_Founded: req.body.Year_Founded,
      Coach_ID: req.body.Coach_ID
    };
    const updatedTeam = await Teams.replaceOne({ Team_ID: teamId }, teamInfo);
    
    if (updatedTeam.modifiedCount === 0) {
      return res.status(404).json({ error: "Team with this ID not found" });
    }
    
    res.status(200).json(updatedTeam); 
  } catch (error) {
    console.error("Error updating team:", error);
    
    res.status(500).json({ 
      error: "Error updating team.",
    });
  }
};

const deleteTeam = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamId = req.params.Team_ID;
    const deletedTeam = await Teams.deleteOne({ Team_ID: teamId });
    
    if (deletedTeam.deletedCount === 0) {
      return res.status(404).json({ error: "Team not found" });
    }
    
    res.status(204).json(deletedTeam); 
  } catch (error) {
    console.error("Error deleting team:", error);
    
    res.status(500).json({ 
      error: "Error deleting team.",
    });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
