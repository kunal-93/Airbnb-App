const rooms = require('../roomListing');
const {validateBookingDates}  = require('./general');
const {findOneRoomAndRender, updateRoomReservation} = require('../roomDBLogic');
const validateRoomBookingForm = (req, res) => {

    const errors = {};

    const checkInDate = req.body.checkIn;
    const checkOutDate = req.body.checkOut;
    const errorMsg = validateBookingDates(checkInDate, checkOutDate);

    if(errorMsg)
        errors.invalidCheckInCheckOut = errorMsg;

    if(req.body.guestCount == ""){
        errors.invalidGuests = "Please select number of guests";
    }

    return errors;
}

const searchValidation = (req, res, toRenderOnError) =>{

    const errors = validateRoomBookingForm(req, res);
    
    if(Object.keys(errors).length > 0){
        res.render(toRenderOnError, {
            errorMessages : errors,
            userData: req.body,
            featuredRooms: rooms.getFeaturedRooms()
        });
    }
    else{
        // rooms.getRoomsByLocation(req, res)
        rooms.getFilteredRooms(req, res);
    }
}

const bookingValidation = (req, res) => {
    const errors = validateRoomBookingForm(req, res);
    const roomID = req.params.id;
    
    if(Object.keys(errors).length > 0){
        findOneRoomAndRender(roomID, res, "rooms/roomPage", {errorMessages: errors})
    }
    else{ 
        updateRoomReservation(roomID, res, req.body.checkIn, req.body.checkOut);
    }
}


module.exports.searchValidation = searchValidation;
module.exports.bookingValidation = bookingValidation;