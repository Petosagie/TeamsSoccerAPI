
// Import the necessary modules
const express = require('express');
const router = express.Router();

const matchesController = require("../controllers/matches");
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", matchesController.getAllMatches);

router.get("/:Match_ID", matchesController.getSingleMatch);

router.post("/", isAuthenticated, validation.saveMatches, matchesController.createMatch);

router.put("/:Match_ID", isAuthenticated, validation.saveMatches, matchesController.updateMatch);

router.delete("/:Match_ID", isAuthenticated, matchesController.deleteMatch);

module.exports = router;

