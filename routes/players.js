// Import the necessary modules
const router = require("express").Router();
const playersController = require("../controllers/players");

const schemas = require("../helpers/validate.js");
const middleware = require("../middleware/validate.js");

router.get("/", playersController.getAllPlayers);
router.get("/:Player_ID", playersController.getPlayerById);
router.get("/Position/:Player_Position", playersController.getPlayersByPosition);
router.post("/", schemas.playerValidator, middleware.isDataValidated, playersController.createPlayer);
router.put("/:Player_ID", playersController.updatePlayer);
router.delete("/:Player_ID", playersController.deletePlayer);

module.exports = router;