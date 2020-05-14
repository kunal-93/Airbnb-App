const express = require('express')
const router = express.Router()

//Functional Imports
const {searchValidation, bookingValidation} = require("./functionality/RoomBookingFormValidation");
const {validateRoom, addRoom, updateRoom, findOneRoomAndRender} = require("./roomDBLogic");
const RoomListing = require("./roomListing");
const roomModel = require("../models/Room");
const {isAdmin, isAuthenticated} = require("./middleware/auth");

router.get("/listing", (req, res) =>{
    RoomListing.getRoomsByLocation(req, res);
});

router.post('/listing', (req, res) => {
    searchValidation(req, res, "general/home");
});

router.post('/filteredListing', (req, res) =>{
    if(req.session.isAdmin)
        searchValidation(req, res, "general/adminDashboard");
    else
        searchValidation(req, res, "general/dashboard");

});

router.get('/addRoom', isAdmin, (req, res) =>{
    res.render('rooms/addRoomForm', {
        title: 'Add Room - AirBnB'
    });
});

router.post('/addRoom', isAdmin, (req, res) =>{
    addRoom(req, res);
});

router.get('/edit/:id', isAdmin, (req, res) => {
    findOneRoomAndRender(req.params.id, res, "rooms/editRoomForm");  
});

router.get('/reserve/:id', isAuthenticated, (req, res) => {
    findOneRoomAndRender(req.params.id, res, "rooms/roomPage");
});

router.put('/reserve/:id', isAuthenticated, (req, res) => {
    bookingValidation(req, res);
});

router.put('/update/:id', isAdmin, (req, res) => {
    const errors = validateRoom(req, true);
    
    if(Object.keys(errors).length > 0){
        res.render("rooms/editRoomForm", {
            errorMessages : errors,
            roomData: req.body
        });
    }
    else{
        updateRoom(req, res);
    }
})

router.delete('/delete/:id', isAdmin, (req, res) => {

    roomModel.deleteOne({_id: req.params.id})
    .then(()=>{
        res.redirect("/rooms/listing");
    })
    .catch(err=>console.log(`Error while deleting ${err}`));
    
})

module.exports = router;