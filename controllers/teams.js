// Import the Mongoose Library
const mongoose = require("mongoose");
// Import the teams model (create a models/teams.js file)
const Teams = require("../models/teams");

const getAllTeams = async (req, res) => {
  // #swagger.tags=["teams"]
  try {
    const allTeams = await Teams.find();
    res.status(200).json(allTeams);
  } catch (error) {
    console.error("Error fetching teams", error);

    res.status(400).send("Error fetching teames");
  }
};

const getTeamById = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamId = req.params.Team_ID;
    const oneTeam = await Teams.findOne({ Team_ID: teamId });

    // Check if the Team is in the database
    if (!oneTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.status(200).json(oneTeam);
  } catch (error) {
    console.error("Error fetching team, make sure you typed a correct ID");

    res.status(400).json({
      error: "Error fetching team, make sure you typed a correct ID",
    });
  }
};

const createTeam = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    // Extract team details from the request body
    const team = {
      Team_Name: req.body.Team_Name,
      Coach_ID: req.body.Coach_ID,
      Location: req.body.Location,
      Team_ID: req.body.Team_ID,
      Founded_Year: req.body.Founded_Year,
    };
    const newTeam = await Teams.create(team);
    res.status(204).json(newTeam);
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
    // Extract team details from the request body
    const team = {      
      Team_ID: req.body.Team_ID,
      Team_Name: req.body.Team_Name,
      Venue: req.body.Venue,
      Location: req.body.Location,
      Founded_Year: req.body.Founded_Year,
      Coach_ID: req.body.Coach_ID
    };
    const updatedTeam = await Teams.replaceOne({ Team_ID: teamId }, team);
    if(updatedTeam.modifiedCount === 0) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(204).json(updatedTeam);
  } catch (error) {
    // Log the detailed error information
    console.error("Error updating team:", error);

    // Respond with a 400 error message
    res.status(400).json({
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
    // Log the detailed error information
    console.error("Error deleting team:", error);

    // Respond with a 400 error message
    res.status(400).json({
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
