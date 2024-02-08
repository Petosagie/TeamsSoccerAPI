
// Import the necessary modules
const express = require('express');
const router = express.Router();

const playersController = require("../controllers/players");
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", playersController.getAllPlayers);

router.get("/:Player_ID", playersController.getSinglePlayer);

router.post("/", isAuthenticated, validation.savePlayers, playersController.createPlayer);

router.put("/:Player_ID", isAuthenticated, validation.savePlayers, playersController.updatePlayer);

router.delete("/:Player_ID", isAuthenticated, playersController.deletePlayer);

module.exports = router;

