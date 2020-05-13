const rooms = require('./roomListing');
const {validateBookingDates}  = require('./functionality/general');


const searchValidation = (req, res, pageInfo) =>{

    const errors = {};

    const checkInDate = req.body.checkIn;
    const checkOutDate = req.body.checkOut;
    const errorMsg = validateBookingDates(checkInDate, checkOutDate);

    if(errorMsg)
        errors.invalidCheckInCheckOut = errorMsg;

    if(req.body.guestCount == ""){
        errors.invalidGuests = "Please select number of guests";
    }

    if(Object.keys(errors).length > 0){
        res.render("general/home", {
            errorMessages : errors,
            userData: req.body,
            featuredRooms: pageInfo.featuredRooms
        });
    }
    else{
        rooms.getRoomsByLocation(req, res)
    }
}

module.exports.searchValidation = searchValidation;