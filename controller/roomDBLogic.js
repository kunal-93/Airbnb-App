const roomModel = require("../models/Room");
const path = require("path");

const validateRoom = (req, updateRequest=false) =>{
    const roomData = req.body;
    const errors = {}

    if(roomData.title=="")
        errors.invalidTitle = "Name cannot be empty";
    if(roomData.description == "")
        errors.invalidRoomDescription = "Description cannot be empty";
    else{
        try{
            const descriptionObject = JSON.parse(roomData.description);
            roomData.description = descriptionObject;
        }
        catch(err){ 
            errors.invalidRoomDescription = "Description must be a valid JSON String"
        }
    }
    if(roomData.price == "")
        errors.invalidPrice = "Price must be entered";
    if(roomData.beds == "")
        errors.invalidBeds = "Beds must be entered";
    if(roomData.bedRooms == "")
        errors.invalidBedRooms = "Bed Rooms must be entered";
    if(roomData.baths == "")
        errors.invalidBaths = "Baths must be entered";
    if(roomData.maxOccupancy == "")
        errors.invalidMaxOccupancy = "Max Occupancy must be entered";
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
        req.body.description = JSON.stringify(req.body.description, null, 2);
        res.render("rooms/addRoomForm", {
            errorMessages : errors,
            roomData: req.body
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
        featured: room.isFeatured == "on",
        beds: room.beds,
        bedRooms: room.bedRooms,
        maxOccupancy: room.maxOccupancy,
        baths: room.baths
    }

    const newRoom = new roomModel(newRoomInfo);
    
    newRoom.save()
    .then((room)=>{
        updateImage(req, res, room._id)
    })
    .catch(err => {
        const errors = {UnexpectedErrors : "Error while saving " + err}
        
        res.render("rooms/addRoomForm", {
            errorMessages : errors,
            roomData: newRoomInfo
        });
    }) 
}

const updateImage = (req, res, roomID) => {
    req.files.image.name = `mainImage_${roomID}_${path.parse(req.files.image.name).ext}`;
    req.files.image.mv(`public/uploads/${req.files.image.name}`)
    .then(() => {

        roomModel.updateOne({_id: roomID}, {
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
        featured: room.isFeatured == "on",
        beds: room.beds,
        bedRooms: room.bedRooms,
        maxOccupancy: room.maxOccupancy,
        baths: room.baths
    }

    roomModel.updateOne({_id: id}, roomInfo)
    .then(()=>{
        if(req.files != null)
            updateImage(req, res, id)
        else
            res.redirect("/rooms/listing");
    })
    .catch(err=>console.log(`Error while updating ${err}`))
}

const updateRoomReservation = (roomID, res, from, to) => {
    roomModel.findByIdAndUpdate(roomID, 
        { 
            $push: {reserved : {
                from : from,
                to: to
            }}
        },
        {new: true, useFindAndModify: false}
    )
    .then(()=>{
        res.redirect("/rooms/listing");
    })
    .catch(err=>console.log(`Error while reserving room ${err}`));
}

const getDescriptionArray = (description) => {
    const filteredArray =  description.map(ele => {
        return {
            heading: ele.heading,
            paragraph: ele.paragraph
        }
    })

    return JSON.stringify(filteredArray, null, 2);
}

const findOneRoomAndRender = (roomId, res, renderPath, Info = null) => {
    roomModel.findById(roomId).lean()
    .then(room => {

        const roomInfo = {
            id: room._id, 
            title: room.title, 
            imagePath: `/uploads/${room.image}`,
            description: renderPath.includes("editRoomForm") ? getDescriptionArray(room.description) : room.description, 
            price: room.price, 
            location: room.location, 
            isAvailable: room.isAvailable, 
            featured : room.featured,
            beds: room.beds,
            bedRooms: room.bedRooms,
            maxOccupancy: room.maxOccupancy,
            baths: room.baths
        };
        
        let data = {};
        if(Info != null){
            data = JSON.parse(JSON.stringify(Info));
        }

        data.roomData = roomInfo;

        res.render(renderPath, data)
    })
    .catch(err=>console.log(`Error while pulling from DB ${err}`));
}

module.exports.addRoom = addRoom;
module.exports.updateRoom = updateRoom;
module.exports.validateRoom = validateRoom;
module.exports.findOneRoomAndRender = findOneRoomAndRender;
module.exports.updateRoomReservation = updateRoomReservation;