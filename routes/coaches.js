
// Import the necessary modules
const express = require('express');
const router = express.Router();

const coachesController = require("../controllers/coaches");
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", coachesController.getAllCoaches);

router.get("/:Coach_ID", coachesController.getSingleCoach);

router.post("/", isAuthenticated, validation.saveCoaches, coachesController.createCoach);

router.put("/:Coach_ID", isAuthenticated, validation.saveCoaches, coachesController.updateCoach);

router.delete("/:Coach_ID", isAuthenticated, coachesController.deleteCoach);

module.exports = router;

