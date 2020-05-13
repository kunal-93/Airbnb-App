const rooms = require('./roomListing');
const {validateBookingDates}  = require('./functionality/general');


const searchValidation = (req, res) =>{

    const errors = {};
    
    if(req.body.checkIn == "" || req.body.checkOut == ""){
        errors.invalidCheckInCheckOut = "dates must be selected";
    }
    else{
        
        const checkInDate = req.body.checkIn;
        const checkOutDate = req.body.checkOut;
        const result = validateBookingDates(checkInDate, checkOutDate);

        if(result.errorFound)
            errors.invalidCheckInCheckOut = result.msg;
    }

    if(req.body.guestCount == ""){
        errors.invalidGuests = "Please select number of guests";
    }

    if(Object.keys(errors).length > 0){
        res.render("general/home", {
            errorMessages : errors,
            userData: req.body
        });
    }
    else{
        rooms.getRoomsByLocation(req, res)
    }
}

module.exports.searchValidation = searchValidation;