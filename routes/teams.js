
// Import the necessary modules
const express = require('express');
const router = express.Router();

const teamsController = require("../controllers/teams");
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", teamsController.getAllTeams);

router.get("/:Team_ID", teamsController.getSingleTeam);

router.post("/", isAuthenticated, validation.saveTeams, teamsController.createTeam);

router.put("/:Team_ID", isAuthenticated, validation.saveTeams, teamsController.updateTeam);

router.delete("/:Team_ID", isAuthenticated, teamsController.deleteTeam);

module.exports = router;

