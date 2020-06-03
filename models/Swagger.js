const searchRooms = {
    searchRooms: {
        properties: {
            location: {
                type: String,
                example: "All",
                default: "All"
            },
            checkIn: {
                type: String,
                example: "2020-06-03"
            },
            checkOut: {
                type: String,
                example: "2020-06-04"
            },
            guestCount: {
                type: String,
                example: "1"
            }
        }
    }
}

module.exports = {
    searchRooms : searchRooms
}