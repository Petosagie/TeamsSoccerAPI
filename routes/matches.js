// Import the necessary modules
const router = require("express").Router();
const matchesController = require("../controllers/matches");

const schemas = require("../helpers/validate.js");
const middleware = require("../middleware/validate.js");

router.get("/", matchesController.getAllMatches);
router.get("/:Match_ID", matchesController.getMatchById);
router.get("/teams/:Team_ID", matchesController.getMatchesByTeamId);
router.post("/", schemas.matchesValidator, middleware.isDataValidated, matchesController.createMatch);
router.put("/:Match_ID", matchesController.updateMatch);
router.delete("/:Match_ID", matchesController.deleteMatch);

module.exports = router;