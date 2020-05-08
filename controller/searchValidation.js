const rooms = require('./roomListing');

const getLocalTodayDate = () => {
    const currDateObj = new Date();

    let [currMonth, currDay, currYear] = currDateObj.toLocaleDateString().split('/');

    currMonth = currMonth>9?currMonth:'0'+currMonth;

    currDay = currDay>9?currDay:'0'+ currDay;
        
    return   currYear + "-" + currMonth + "-" + currDay;
}

function searchValidation(req, res){

    const errors = {};
    
    if(req.body.checkIn == "" || req.body.checkOut == ""){
        errors.invalidCheckInCheckOut = "dates must be selected";
    }
    else{
        
        const checkInDate = req.body.checkIn;
        const checkOutDate = req.body.checkOut;
        const currDate = getLocalTodayDate();

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