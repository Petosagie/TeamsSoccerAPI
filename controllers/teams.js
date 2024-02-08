// Import the Mongoose Library
const mongoose = require("mongoose");
const Teams = require("../models/teams");

const getAllTeams = async (req, res) => {
  // #swagger.tags=["teams"]
  try {
    const TeamsInfo = await Teams.find();
    res.status(200).json(TeamsInfo);
  } catch (error) {
    console.error("Error fetching teams", error);

    res.status(400).send("Error fetching teames");
  }
};

const getTeamById = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamId = req.params.Team_ID;
    const singleTeam = await Teams.findOne({ Team_ID: teamId });

    // Check if the Team is in the database
    if (!singleTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.status(200).json(singleTeam);
  } catch (error) {
    console.error("Error fetching team, make sure you enter a correct ID");

    res.status(400).json({
      error: "Error fetching team, make sure you enter a correct ID",
    });
  }
};

const createTeam = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamInfo = {
      Team_Name: req.body.Team_Name,
      Coach_ID: req.body.Coach_ID,
      Venue: req.body.Venue,
      Location: req.body.Location,
      Year_Founded: req.body.Year_Founded,
      Team_ID: req.body.Team_ID

    };
    const newTeam = await Teams.create(teamInfo);
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
