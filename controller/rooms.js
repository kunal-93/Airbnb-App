const express = require('express')
const router = express.Router()

//Functional Imports
const SearchValidation = require("./searchValidation");
const {validateRoom, addRoom, updateRoom} = require("./roomsFunctionality");
const RoomListing = require("./roomListing");
const roomModel = require("../models/Room");
const {isAdmin, isAuthenticated} = require("./middleware/auth");

router.get("/listing", (req, res) =>{

    RoomListing.getRoomsByLocation(req, res);
});

router.post('/listing', (req, res) => {
    SearchValidation.searchValidation(req, res);
});

router.post('/filteredListing', (req, res) =>{
    // res.redirect(`/rooms/listing?location=${req.body.location}`);
    RoomListing.getRoomsByLocation(req, res);

});

router.get('/addRoom', isAdmin, (req, res) =>{
    res.render('rooms/addRoomForm', {
        title: 'Add Room - AirBnB'
    });
});

router.post('/addRoom', (req, res) =>{
    addRoom(req, res);
});

router.get('/edit/:id', isAdmin, (req, res) => {

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
        
        res.render("rooms/editRoomForm", {
            title: "Edit Room - AirBnb",
            roomData: roomInfo
        })
    })
    .catch(err=>console.log(`Error while pulling from DB ${err}`));
  
});

router.get('/reserve/:id', isAuthenticated, (req, res) => {
    res.render('rooms/roomDescription', {
        title: 'Reserve Room-Airbnb'
    })
})

router.put('/update/:id', (req, res) => {

    const errors = validateRoom(req, true);

    if(Object.keys(errors).length > 0){
        res.render("rooms/editRoomForm", {
            errorMessages : errors,
        });
    }
    else{
        updateRoom(req, res);
    }
})

router.delete('/delete/:id', (req, res) => {

    roomModel.deleteOne({_id: req.params.id})
    .then(()=>{
        res.redirect("/rooms/listing");
    })
    .catch(err=>console.log(`Error while deleting ${err}`));
    
})

module.exports = router;