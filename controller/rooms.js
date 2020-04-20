const express = require('express')
const router = express.Router()

//Functional Imports
const SearchValidation = require("./searchValidation");
const {addRoom} = require("./roomsFunctionality");
const RoomListing = require("../models/rooms/roomListing");
const roomModel = require("../models/Room");

router.get("/listing", (req, res) =>{
    res.render("general/login", {title: "login-AirBnB"});
});

router.post('/listing', (req, res) => {
    SearchValidation.searchValidation(req, res);
});

router.post('/addRoom', (req, res) =>{
    addRoom(req, res);
});

router.post('/createButton', (req, res) =>{
    res.render('general/adminDashboard', {
        title: 'admin dashboard-AirBnb',
        adminAction : {addRoom: true},
        Rooms: RoomListing.getAllRooms()
    });
})

router.get('/edit/:id', (req, res) => {

    roomModel.findById(req.params.id)
    .then(room => {
        const roomInfo = {
            id: room._id, 
            title: room.title, 
            description: room.description, 
            price: room.price, 
            location: room.location, 
            isAvailable: room.isAvailable, 
            featured : room.featured
        };
        // console.log(roomInfo);
        res.render("rooms/editRoomForm", {
            title: "Edit Room - AirBnb",
            roomData: roomInfo
        })
    })
    .catch(err=>console.log(`Error while pulling from DB ${err}`));
  
});

router.put('/update/:id', (req, res) => {
    const room = req.body;
    const id = req.params.id;
    const roomInfo = {
        title : room.title,
        description : room.description,
        price: room.price,
        location : room.location,
        isAvailable: room.isAvailable,
        featured: room.isFeatured == "on"
    }

    roomModel.updateOne({_id: id}, roomInfo)
    .then(()=>{
        res.redirect("/user/dashboard");
    })
    .catch(err=>console.log(`Error while updating ${err}`))
})

router.delete('/delete/:id', (req, res) => {

    roomModel.deleteOne({_id: req.params.id})
    .then(()=>{
        res.redirect("/user/dashboard");
    })
    .catch(err=>console.log(`Error while deleting ${err}`));
    
})

module.exports = router;