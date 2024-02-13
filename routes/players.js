// Import the necessary modules
const router = require("express").Router();
const playersController = require("../controllers/players");

const middleware = require("../helpers/validate.js");
const schemas = require("../middleware/validate.js");
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", playersController.getAllPlayers);

router.get("/:Player_ID", playersController.getPlayerById);

router.get("/Position/:Player_Position", playersController.getPlayersByPosition);

router.post("/", isAuthenticated, schemas.playerValidator, middleware.isDataValidated, playersController.createPlayer);

router.put("/:Player_ID", isAuthenticated, schemas.playerValidator, middleware.isDataValidated,  playersController.updatePlayer);

router.delete("/:Player_ID", isAuthenticated, playersController.deletePlayer);

module.exports = router;