// Import the necessary modules
const express = require('express');
const router = require("express").Router();

const coachesController = require("../controllers/coaches");
const middleware = require("../helpers/validate.js");
const schemas = require("../middleware/validate.js");
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", coachesController.getAllCoaches);

router.get("/:Coach_ID", coachesController.getSingleCoach);

router.post("/",isAuthenticated, schemas.coachValidator, middleware.isDataValidated, coachesController.createCoach);

router.put("/:Coach_ID",isAuthenticated, schemas.coachValidator, middleware.isDataValidated,coachesController.updateCoach);

router.delete("/:Coach_ID",isAuthenticated, coachesController.deleteCoach);

module.exports = router;