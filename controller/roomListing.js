const roomModel = require("../models/Room");
const rooms = {
    
    roomListing :  [],
    featuredRooms : [],
    roomsByLocation: [],

    init(){ 
        roomModel.find()
        .then(rooms => {

            const allRooms = rooms.map(room => {
                return {
                    id: room._id,
                    title : room.title,
                    imagePath: `/uploads/${room.image}`,
                    description : room.description,
                    price: room.price,
                    location : room.location,
                    isAvailable: room.isAvailable,
                    featured: room.featured
                }
            })
            this.roomListing.length = 0;
            this.featuredRooms.length = 0;
            allRooms.forEach(room =>  {
                this.roomListing.push(room);
                if(room.featured)
                    this.featuredRooms.push(room);
            });
            
        })
        .catch(err=>console.log(err));

    },
    
    getAllRooms(){
        this.init();
        return this.roomListing;
    },

    getFeaturedRooms(){
        this.init();
        return this.featuredRooms;
    },
    getRoomsByLocation(req, res){
        const filterLocation = req.body.location;
       
        const query = filterLocation == null || filterLocation.localeCompare("All") == 0 ? {} : {location: filterLocation}
    
        roomModel.find(query)
        .then(rooms => {
            
            const filteredRooms = rooms.map(room => {
                return {
                    id: room._id,
                    title : room.title,
                    imagePath: `/uploads/${room.image}`,
                    description : room.description,
                    price: room.price,
                    location : room.location,
                    isAvailable: room.isAvailable,
                    featured: room.featured
                }
            })
            const data =  {
                title: "room listing-AirBnB",
                roomList : filteredRooms,
                location: filterLocation
            }
            if (req.session.userInfo != null && req.session.userInfo.isAdmin)
                data.admin = true

            res.render("partials/roomListing", data);
            
        })
        .catch(err=>console.log(err));
    }
}

rooms.init();
module.exports = rooms;