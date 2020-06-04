/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();

//Functional Imports
const RoomListing = require("../roomListing");
const UserRegistration = require("../registration.js");
const LoginValidation = require("../login.js");
const {isAuthenticated} = require("../middleware/auth");

router.get("/registration", (req, res) =>{
    res.render("general/registration", {title: "Registration-AirBnB"});
});

/**
 * @swagger
 * /user/registration:
 *  post:
 *      description: Register a user by posting user details using body parameters
 *      parameters:
 *          -   in: body
 *              name: body
 *              description: body object with user details to register
 *              schema:
 *                  $ref: "#/definitions/registerUser"
 *      responses:
 *          200:
 *              description: OK
 *          400: 
 *              description: Errors in submitted fields. Check response body for more details
 *          401:
 *              description: Account already Exists
 *          500:
 *              description: Internal server error
 */
router.post("/registration", (req, res) => {
    UserRegistration.userValidation(req, res);
});

router.get("/login", (req, res) =>{
    res.render("general/login", {title: "login-AirBnB"});
});

router.post("/login", (req, res) =>{
    LoginValidation.loginValidation(req, res);
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('login');
})

router.get("/dashboard", isAuthenticated, (req, res) =>{

    const roomsData = RoomListing.getAllRooms();
    if(req.session.userInfo.isAdmin){
        res.render("general/adminDashboard", {
            title: "Admin Dashboard-AirBnB",
            roomList: roomsData,
            location: "All",
            admin: true
        });
    }
    else{
        res.render("general/dashboard", {
            title: "Dashboard-AirBnB",
            roomList: roomsData,
            location: "All"
        });
    }
});


// router.get("/profile/",(req,res)=>{

//     res.render("User/userDashboard");
// })

module.exports=router;