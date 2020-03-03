const express = require('express')
const router = express.Router()

//Functional Imports
const SearchValidation = require("./searchValidation");

router.get("/listing", (req, res) =>{
    res.render("general/login", {title: "login-AirBnB"});
});

router.post('/listing', (req, res) => {
    SearchValidation.searchValidation(req, res);
});

module.exports = router;