const RoomListing = require("../models/rooms/roomListing");
const roomModel = require("../models/Room");

const validateRoom = roomData =>{
    const errors = {}

    if(roomData.title=="")
        errors.invalidTitle = "Name cannot be empty";
    if(roomData.description == "")
        errors.invalidRoomDescription = "Description cannot be empty";
    if(roomData.price == "")
        errors.invalidPrice = "Price must be entered";
    
    return errors;
}

const addRoom = (req, res) => {

    const roomData = req.body;
    const errors = validateRoom(roomData);

    if(Object.keys(errors).length > 0){
        res.render("general/adminDashboard", {
            adminAction: {addRoom: true},
            errorMessages : errors,
            userData: roomData,
            Rooms: RoomListing.getAllRooms()
        });
    }
    else{
        saveRoom(roomData, res);
    }
}

const saveRoom = (room, res) => {
    const newRoomInfo = {
        title : room.title,
        description : room.description,
        price: room.price,
        location : room.location,
        isAvailable: room.isAvailable,
        featured: room.isFeatured == "on"
    }

    const newRoom = new roomModel(newRoomInfo);
    
    newRoom.save()
    .then(()=>{
        res.render("general/adminDashboard", {
            userData: room,
            Rooms: RoomListing.getAllRooms(),
            addSuccessful: true
        });
    })
    .catch(err => {
        const errors = {UnexpectedErrors : "Error while saving " + err}
        res.render("general/adminDashboard", {
            adminAction: {addRoom: true},
            errorMessages : errors,
            userData: room,
            Rooms: RoomListing.getAllRooms()
        });
    }) 
}


module.exports.addRoom = addRoom;