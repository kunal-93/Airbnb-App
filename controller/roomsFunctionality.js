const RoomListing = require("./roomListing");
const roomModel = require("../models/Room");
const path = require("path");

const validateRoom = (req, updateRequest=false) =>{
    const roomData = req.body;
    const errors = {}

    if(roomData.title=="")
        errors.invalidTitle = "Name cannot be empty";
    if(roomData.description == "")
        errors.invalidRoomDescription = "Description cannot be empty";
    if(roomData.price == "")
        errors.invalidPrice = "Price must be entered";
    if(req.files == null){
        if(updateRequest == false)
            errors.unexpectedErrors
    }
    else{
        const file = req.files.image;
        if (
            !file.mimetype.includes("jpeg") &&
            !file.mimetype.includes("jpg") &&
            !file.mimetype.includes("png") &&
            !file.mimetype.includes("gif")
            ) 
        {
            errors.unexpectedErrors = "Only images are allowed";
        }
    }
    return errors;
}

const addRoom = (req, res) => {
    const errors = validateRoom(req);

    if(Object.keys(errors).length > 0){
        res.render("rooms/addRoomForm", {
            errorMessages : errors,
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
        updateImage(req, res, room)
    })
    .catch(err => {
        const errors = {UnexpectedErrors : "Error while saving " + err}
        res.render("rooms/addRoomForm", {
            errorMessages : errors,
        });
    }) 
}

const updateImage = (req, res, room) => {
    req.files.image.name = `mainImage_${room._id}_${path.parse(req.files.image.name).ext}`;
    req.files.image.mv(`public/uploads/${req.files.image.name}`)
    .then(() => {

        roomModel.updateOne({_id: room._id}, {
            image: req.files.image.name
        })
        .then(()=>{
            res.redirect('/rooms/listing');
        })
        .catch(err => console.log(`Unable to update Image path ${err}`))
    })
    .catch(err => console.log(`Error uploading Image ${err}`));
}

const updateRoom = (req, res) => {
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
        if(req.files != null)
            updateImage(req, res, room)
        else
            res.redirect("/rooms/listing");
    })
    .catch(err=>console.log(`Error while updating ${err}`))
}

module.exports.addRoom = addRoom;
module.exports.updateRoom = updateRoom;
module.exports.validateRoom = validateRoom;