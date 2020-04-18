const express = require('express')
const router = express.Router()

//Functional Imports
const RoomListing = require("../models/rooms/roomListing");

router.get('/', (req, res) => {
    res.render('general/home', {
        title: "Home-AirBnB",
        featuredRooms: RoomListing.getFeaturedRooms()
    });
});



module.exports = router;