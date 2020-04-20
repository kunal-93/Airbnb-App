const RoomListing = require("../models/rooms/roomListing");
const roomModel = require("../models/Room");
const path = require("path");

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
        saveRoom(req, res);
    }
}

const saveRoom = (req, res) => {
    const room = req.body;
    const newRoomInfo = {
        title : room.title,
        image: "default",
        description : room.description,
        price: room.price,
        location : room.location,
        isAvailable: room.isAvailable,
        featured: room.isFeatured == "on"
    }

    const newRoom = new roomModel(newRoomInfo);
    
    newRoom.save()
    .then((room)=>{
        req.files.image.name = `mainImage_${room._id}_${path.parse(req.files.image.name).ext}`;
        req.files.image.mv(`public/uploads/${req.files.image.name}`)
        .then(() => {

            roomModel.updateOne({_id: room._id}, {
                image: req.files.image.name
            })
            .then(()=>{
                res.render("general/adminDashboard", {
                    userData: room,
                    Rooms: RoomListing.getAllRooms(),
                    addSuccessful: true
                });
            })
            .catch(err => console.log(`Unable to update Image path ${err}`))
        })
        .catch(err => console.log(`Error uploading Image ${err}`));

        
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