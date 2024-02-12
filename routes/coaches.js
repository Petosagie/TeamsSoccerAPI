// Import the necessary modules
const express = require('express');
const router = require("express").Router();

const coachesController = require("../controllers/coaches");
const schemas = require("../helpers/validate.js");
const middleware = require("../middleware/validate.js");

router.get("/", coachesController.getAllCoaches);
router.get("/:Coach_ID", coachesController.getSingleCoach);
router.post("/", schemas.coachValidator, middleware.isDataValidated, coachesController.createCoach);
router.put("/:Coach_ID", coachesController.updateCoach);
router.delete("/:Coach_ID", coachesController.deleteCoach);

module.exports = router;