const searchRooms = {
    searchRooms: {
        properties: {
            location: {
                type: String,
                example: "All",
                enum: ["Toronto", "Vancouver", "Ottawa"]
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

const registerUser = {
    registerUser: {
        properties: {
            email: {
                type: String,
                example: "kunaldhawan0212@gmail.com",
            },
            firstName: {
                type: String,
                example: "Kunal"
            },
            lastName: {
                type: String,
                example: "Dhawan"
            },
            phoneNo: {
                type: Number,
                example: "6479983500"
            },
            password: {
                type: String,
                example: ""
            },
            verifyPassword: {
                type: String,
                example: ""
            }
        }
    }
}

module.exports = {
    searchRooms : searchRooms,
    registerUser: registerUser
}