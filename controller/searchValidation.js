const rooms = require('./roomListing');

function searchValidation(req, res){

    const errors = {};
    
    if(req.body.checkIn == "" || req.body.checkOut == ""){
        errors.invalidCheckInCheckOut = "dates must be selected";
    }
    else{
        const currDateObj = new Date();
        const checkInDate = req.body.checkIn;
        const checkOutDate = req.body.checkOut;

        let currMonth = currDateObj.getMonth() + 1;
        currMonth = currMonth>9?currMonth:'0'+currMonth;

        let currDay = currDateObj.getDate();
        currDay = currDay>9?currDay:'0'+ currDay;

        const currDate = currDateObj.getFullYear() + "-" + currMonth + "-" + currDay;

        if(checkInDate < currDate || checkOutDate < currDate)
            errors.invalidCheckInCheckOut = "dates cannot be in past";
        else if(checkOutDate < checkInDate)
            errors.invalidCheckInCheckOut = "Checkout cannot be before checkin";
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
        // res.redirect(`/rooms/listing?location=${req.body.location}`);
        rooms.getRoomsByLocation(req, res)
        // res.render("rooms/roomListing", {
        //     roomList : rooms.roomsByLocation
        // });
    }
}

module.exports.searchValidation = searchValidation;