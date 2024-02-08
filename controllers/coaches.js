// Import the Mongoose 
const mongoose = require("mongoose");
const Coaches = require("../models/coaches");


const getAllCoaches = async (req, res) => {
  // #swagger.tags=["coaches"]
  try {
    const allCoaches = await Coaches.find({});
    res.status(200).json(allCoaches);
  } catch (error) {
    console.error("Error fetching coaches", error);

    res.status(500).send("Error fetching coaches");
  }
};


const getSingleCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params.Coach_ID;
    const singleCoach = await Coaches.findOne({ Coach_ID: coachId });
    if (!singleCoach) {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.status(200).json(singleCoach);
  } catch (error) {
    console.error("Error fetching coach, make sure you typed a correct ID");
    res.status(400).json({
      error: "Error fetching coach, make sure you typed a correct ID",
    });
  }
};

const createCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    // Extract coach details from the request body
    const coach = {
      Coach_ID: req.body.Coach_ID,
      Coach_Names: req.body.Coach_Names,
      Coach_Age: req.body.Coach_Age,
      Coach_Nationality: req.body.Coach_Nationality,
      NO_Matches: req.body.NO_Matches,
      Team_ID: req.body.Team_ID,

    };
    const newCoach = await Coaches.create(coach);
    res.status(204).json(newCoach);
  } catch (error) {
    // Log the detailed error information
    console.error("Error creating coach:", error);
    // Respond with a 400 which indicate a bad request 
    res.status(400).json({
      error: "Error creating coach. Check the server logs for more details.",
    });
  }
};


const updateCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params.Coach_ID;
    // Extract coach details from the request body
    const coach = {
      Coach_ID: coachId,
      Coach_Names: req.body.Coach_Names,
      Coach_Age: req.body.Coach_Age,
      Coach_Nationality: req.body.Coach_Nationality,
      NO_Matches: req.body.NO_Matches,
      Team_ID: req.body.Team_ID,

    };
    await Coaches.validate(coach);
    const updatedCoach = await Coaches.replaceOne({ Coach_ID: coachId }, coach);

    if (updatedCoach.modifiedCount === 0) {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.status(204).json(updatedCoach);
  } catch (error) {

    // Log the detailed error information
    console.error("Error updating coach:", error)

    // Respond with a 400 which indicate a bad request 
    res.status(400).json({
      error: "Error updating coach. Check the server logs for more details.",
    });
  }
};
const deleteCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params.Coach_ID;
    const deletedCoach = await Coaches.deleteOne({ Coach_ID: coachId });
    if (deletedCoach.deletedCount === 0) {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.status(204).json(deletedCoach);
  } catch (error) {
    // Log the detailed error information
    console.error("Error deleting coach:", error);

    // Respond with a 400 which indicate a bad request 
    res.status(400).json({
      error: "Error deleting coach. Check the server logs for more details.",
    });
  }
};

module.exports = {
  getAllCoaches,
  getSingleCoach,
  createCoach,
  updateCoach,
  deleteCoach,
}