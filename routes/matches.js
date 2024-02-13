// Import the necessary modules
const router = require("express").Router();
const matchesController = require("../controllers/matches");

const middleware = require("../helpers/validate.js");
const schemas = require("../middleware/validate.js");
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", matchesController.getAllMatches);

router.get("/:Match_ID", matchesController.getMatchById);

router.get("/teams/:Team_ID", matchesController.getMatchesByTeamId);

router.post("/",isAuthenticated, schemas.matchesValidator, middleware.isDataValidated, matchesController.createMatch);

router.put("/:Match_ID", isAuthenticated, schemas.matchesValidator, middleware.isDataValidated, matchesController.updateMatch);

router.delete("/:Match_ID",isAuthenticated, matchesController.deleteMatch);

module.exports = router;