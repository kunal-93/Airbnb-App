const roomModel = require("../Room");
const rooms = {
    
    roomListing :  [],
    featuredRooms : [],

    init(){ 
        roomModel.find()
        .then(rooms => {

            const allRooms = rooms.map(room => {
                return {
                    id: room._id,
                    title : room.title,
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
    }
}

rooms.init();
module.exports = rooms;