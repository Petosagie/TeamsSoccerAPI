const router = require("express").Router();
const teamsController = require("../controllers/teams.js");

const middleware = require("../helpers/validate.js");
const schemas = require("../middleware/validate.js");
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", teamsController.getAllTeams);
router.get("/:Team_ID", teamsController.getTeamById);
router.post("/", schemas.teamValidator, middleware.isDataValidated, teamsController.createTeam);
router.put("/:Team_ID",schemas.teamValidator, middleware.isDataValidated, teamsController.updateTeam);
router.delete("/:Team_ID", teamsController.deleteTeam);

module.exports = router;