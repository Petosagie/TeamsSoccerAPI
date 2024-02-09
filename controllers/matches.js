// Import the Mongoose 
const express = require("express");
const mongoose = require("mongoose");
const Matches = require("../models/matches");


const getAllMatches = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchInfo = await Matches.find();
    if (!matchInfo || matchInfo.length === 0) {
      return res.status(404).json({ error: "No matches found" });
    }
    res.status(200).json(matchInfo);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMatchById = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params.Match_ID;
    const matchInfo = await Matches.findOne({ Match_ID: matchId });
    if (!matchInfo) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(200).json(matchInfo);
  } catch (error) {
    console.error("Error fetching match:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMatchesByTeamId = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const teamId = req.params.Team_ID;
    const matchInfo = await Matches.find({ 'Teams_Involved': { '$in': teamId } });
    if (!matchInfo || matchInfo.length === 0) {
      return res.status(404).json({ error: "No matches found for this team" });
    }
    res.status(200).json(matchInfo);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const createMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchInfo = {
      Match_ID: req.body.Match_ID,
      Match_Date: new Date(req.body.Match_Date), 
      Teams_Involved: req.body.Teams_Involved,
      Score: req.body.Score,
      Stadium: req.body.Stadium,
      Goals: req.body.Goals.map((goal) => ({
        Player_ID: goal.Player_ID,
        Time: parseInt(goal.Time), 
      })),
    };
    
    // Check if a match with the same Match_ID already exists
    const existingMatch = await Matches.findOne({ Match_ID: matchInfo.Match_ID });
    if (existingMatch) {
      return res.status(400).json({ error: "A match with the same Match_ID already exists." });
    }
    
    const newMatch = await Matches.create(matchInfo);
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
    const matchInfo = {
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
    const updatedMatch = await Matches.replaceOne({ Match_ID: matchId }, matchInfo);
    if (updatedMatch.modifiedCount === 0) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(200).json(updatedMatch); // Changed status to 200

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
    res.status(204).json(deletedMatch); // Changed status to 204

  } catch (error) {
    console.error("Error deleting match:", error);
    res.status(500).json({
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
