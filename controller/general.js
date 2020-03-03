const express = require('express')
const router = express.Router()

//Functional Imports
const UserRegistration = require("./registration.js");
const LoginValidation = require("./login.js");
const featuredRoomListing = require("../models/rooms/featuredRooms")

router.get('/', (req, res) => {
    res.render('general/home', {
        title: "Home-AirBnB",
        featuredRooms: featuredRoomListing.getAllRooms()
    });
});

router.get("/registration", (req, res) =>{
    res.render("general/registration", {title: "Registration-AirBnB"});
});

router.post("/registration", (req, res) => {
    UserRegistration.userValidation(req, res);
    });

router.get("/login", (req, res) =>{
    res.render("general/login", {title: "login-AirBnB"});
});
router.post("/login", (req, res) =>{
    LoginValidation.loginValidation(req, res);
});

router.get("/dashboard", (req, res) =>{
    res.render("general/dashboard", {
        title: "Dashboard-AirBnB",
        featuredRooms: featuredRoomListing.getAllRooms()
    });
});

module.exports = router;