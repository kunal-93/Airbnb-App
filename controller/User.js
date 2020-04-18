/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();

//Functional Imports
const RoomListing = require("../models/rooms/roomListing");
const UserRegistration = require("./registration.js");
const LoginValidation = require("./login.js");

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
        featuredRooms: RoomListing.getAllRooms()
    });
});

// router.get("/profile/",(req,res)=>{

//     res.render("User/userDashboard");
// })

module.exports=router;