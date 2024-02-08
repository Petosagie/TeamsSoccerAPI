// Import the Mongoose Library
const express = require("express");

const mongoose = require("mongoose");
// Import the matches model (create a models/matches.js file)
const Matches = require("../models/matches");

const getAllMatches = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matches = await Matches.find();
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
   
    res.status(400).json({ error: "Error fetching matches" });
  }
};

const getMatchById = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params.Match_ID;
    const match = await Matches.findOne({ Match_ID: matchId });
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(200).json(match);
  } catch (error) {
    console.error("Error fetching match:", error);
    
    res.status(400).json({ error: "Error fetching match" });
  }
};

const getMatchesByTeamId = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const teamId = req.params.Team_ID;
    const match = await Matches.find({ 'Teams_Involved': { '$in': teamId } });

    res.status(200).json(match);
  } catch (error) {
    console.error("Error fetching match:", error);

    res.status(400).json({ error: "Error fetching match" });
  }
};

const createMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchData = {
      Match_ID: req.body.Match_ID,
      Date: new Date(req.body.Date), 
      Teams_Involved: req.body.Teams_Involved,

      Score: req.body.Score,
      Stadium: req.body.Stadium,
      Goals: req.body.Goals.map((goal) => ({
        Player_ID: goal.Player_ID,
        Time: parseInt(goal.Time), 
      })),
    };
    const newMatch = await Matches.create(matchData);
    res.status(204).json(newMatch); 
  } catch (error) {
    console.error("Error creating match:", error);
    
    res.status(400).json({
      error: "Error creating match.",
    });
  }
};

const updateMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params.Match_ID; 
    const matchData = {
      Match_ID: matchId,
      Date: new Date(req.body.Date),
      Teams_Involved: req.body.Teams_Involved,

      Score: req.body.Score,
      Stadium: req.body.Stadium,
      Goals: req.body.Goals.map(goal => ({
        Player_ID: goal.Player_ID,
        Time: parseInt(goal.Time)
      })),
    };
    const updatedMatch = await Matches.replaceOne({ Match_ID: matchId }, matchData);
    if (updatedMatch.modifiedCount === 0) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(204).json(updatedMatch);

  } catch (error) {
    console.error("Error updating match:", error);

    res.status(500).json({
      error: "Error updating match.",
    });
  }
};

const deleteMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params.Match_ID;
    const deletedMatch = await Matches.deleteOne({ Match_ID: matchId });
    if (deletedMatch.deletedCount === 0) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(204).json(deletedMatch);
  } catch (error) {
    console.error("Error deleting match:", error);

    // Respond with a 400 error message
    res.status(400).json({
      error: "Error deleting match.",
    });
  }
};

module.exports = {
  getAllMatches,
  getMatchById,
  getMatchesByTeamId,
  createMatch,
  updateMatch,
  deleteMatch,
};
