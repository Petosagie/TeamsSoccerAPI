const router = require("express").Router();
const teamsController = require("../controllers/teams.js");

const schemas = require("../helpers/validate.js");
const middleware = require("../middleware/validate.js");

router.get("/", teamsController.getAllTeams);
router.get("/:Team_ID", teamsController.getTeamById);
router.post("/", schemas.teamValidator, middleware.isDataValidated, teamsController.createTeam);
router.put("/:Team_ID", teamsController.updateTeam);
router.delete("/:Team_ID", teamsController.deleteTeam);

module.exports = router;