// Import the Mongoose 
const mongoose = require("mongoose");
const Coaches = require("../models/coaches");


const getAllCoaches = async (req, res) => {
  // #swagger.tags=["coaches"]
  try {
    const allCoaches = await Coaches.find({});
    
    if (!allCoaches || allCoaches.length === 0) {
      // If no coaches are found, respond with a 404 Not Found status
      return res.status(404).json({ error: "Coach not found" });
    }
    
    res.status(200).json(allCoaches);
  } catch (error) {
    console.error("Error fetching coaches", error);
    
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getSingleCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params.Coach_ID;

    if (!coachId) {
      // Check if coachId is empty or blank
      return res.status(400).json({ error: "Coach ID not provided" });
    }

    const singleCoach = await Coaches.findOne({ Coach_ID: coachId });

    if (!singleCoach) {
      // If coach with the given ID is not found, return 404 status
      return res.status(404).json({ error: "No coach with this ID found" });
    }

    // If coach is found, return 200 status with coach data
    res.status(200).json(singleCoach);
  } catch (error) {
    // If there is an error during fetching coach, return 500 status
    console.error("Error fetching coach, make sure you typed a correct ID", error);
    res.status(500).json({
      error: "Error fetching coach, please try again later",
    });
  }
};


const createCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    // Extract coach details from the request body
    const coach = {
      Coach_ID: req.body.Coach_ID,
      Coach_Name: req.body.Coach_Name,
      Coach_Age: req.body.Coach_Age,
      Coach_Nationality: req.body.Coach_Nationality,
      No_Matches: req.body.No_Matches,
      Team_ID: req.body.Team_ID
    };

    // Check if a coach with the same Coach_ID already exists
    const existingCoach = await Coaches.findOne({ Coach_ID: coach.Coach_ID });

    if (existingCoach) {
      // If a coach with the same Coach_ID exists, return an error
      return res.status(400).json({ error: "Coach with the same ID already exists." });
    }

    // If no coach with the same Coach_ID exists, create a new coach
    const newCoach = await Coaches.create(coach);
    res.status(204).json(newCoach);
  } catch (error) {
    // Log the detailed error information
    console.error("Error creating coach:", error);
    // Respond with a 400 which indicate a bad request 
    res.status(500).json({
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

    // Check if coachId is empty or blank
    if (!coachId) {
      return res.status(400).json({ error: "Coach ID not provided" });
    }

    const updatedCoach = await Coaches.replaceOne({ Coach_ID: coachId }, coach);

    if (updatedCoach.modifiedCount === 0) {
      // If no coach was updated, respond with a 404 Not Found status
      return res.status(404).json({ error: "Coach not found" });
    }
    // Respond with a 204 No Content status as the coach was successfully updated
    res.status(204).json(updatedCoach);
  } catch (error) {
    // Log the detailed error information
    console.error("Error updating coach:", error);

    // Respond with a 500 Internal Server Error status
    res.status(500).json({
      error: "Internal Server Error. Please try again later.",
    });
  }
};

const deleteCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params.Coach_ID;
    
    // Check if coachId is empty or blank
    if (!coachId) {
      return res.status(400).json({ error: "Coach ID not provided" });
    }

    const deletedCoach = await Coaches.deleteOne({ Coach_ID: coachId });

    // Check if coach is not found
    if (deletedCoach.deletedCount === 0) {
      return res.status(404).json({ error: "Coach not found" });
    }

    // Successfully deleted
    res.status(204).json(deletedCoach);
  } catch (error) {
    // Log the detailed error information
    console.error("Error deleting coach:", error);

    // Respond with a 500 Internal Server Error
    res.status(500).json({
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