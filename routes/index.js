//Import necessary modules
const express = require('express');
const router = require("express").Router();
const passport = require('passport');
const swagger = require('./swagger');

// // Main router middle ware, index route
// router.get('/', (req, res) => {
//     //#swagger.tags=['Welcome Message']
//     res.send( "<center><h1 style='color:blue; padding-top: 15rem; font-size:6rem'>Welcome, our TeamSoccerAPI</h1></center>");
// })


// Main router middle ware, index route
router.get('/', (req, res) => {
    res.render('index', {user: req.session.user});
});

// login route
router.use('/login', passport.authenticate('github'), (req, res) => {});

// logout route
router.use('/logout', (req, res) => {
    req.logout(function(err) {
        if(err) {
            return next(err)
        }
        res.redirect('/');
    })
   
})


router.use("/", require("./swagger"));  
// Use the "/teams" route defined in the "teams" module
router.use("/teams", require("./teams"));
// Use the "/players" route defined in the "players" module
router.use("/players", require("./players"));
// Use the "/coaches" route defined in the "coaches" module
router.use("/coaches", require("./coaches"));
// Use the "/matches" route defined in the "matches" module
router.use("/matches", require("./matches"));


module.exports = router;

