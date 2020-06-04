const express = require('express')
const router = express.Router()

//Functional Imports
const RoomListing = require("../roomListing");

router.get('/', (req, res) => {
    res.render('general/home', {
        title: "Home-AirBnB",
        featuredRooms: RoomListing.getFeaturedRooms()
    });
});

module.exports = router;