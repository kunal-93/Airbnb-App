const roomModel = require("../models/Room");

const rooms = {
    
    roomListing :  [],
    featuredRooms : [],
    roomsByLocation: [],

    getFilteredDescription(description){
        const filteredArray =  description.map(ele => {
            return {
                heading: ele.heading,
                paragraph: ele.paragraph
            }
        })
    },

    init(){ 
        roomModel.find().lean()
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
                    featured: room.featured,
                    beds: room.beds,
                    bedRooms: room.bedRooms,
                    maxOccupancy: room.maxOccupancy,
                    baths: room.baths
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
    getRoomsByQuery(query, req, res){
        roomModel.find(query).lean()
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
                    featured: room.featured,
                    beds: room.beds,
                    bedRooms: room.bedRooms,
                    maxOccupancy: room.maxOccupancy,
                    baths: room.baths
                }
            })
            const data =  {
                title: "room listing-AirBnB",
                roomList : filteredRooms,
                location: req.body.location
            }
            if (req.session.userInfo != null && req.session.userInfo.isAdmin)
                data.admin = true

            res.render("partials/roomListing", data);
            
        })
        .catch(err=>console.log(err));
    },
    getRoomsByLocation(req, res){
        const filterLocation = req.body.location;
       
        const query = filterLocation == null || filterLocation.localeCompare("All") == 0 ? {} : {location: filterLocation}
        
        this.getRoomsByQuery(query, req, res);
        
    },
    getFilteredRooms(req, res){
        const filterLocation = req.body.location;
        const fromDate = req.body.checkIn;
        const toDate = req.body.checkOut;
        
        let query = filterLocation == null || filterLocation.localeCompare("All") == 0 ? {} : {location: filterLocation}

        query.maxOccupancy = {$gte: req.body.guestCount}
        query.reserved = {
            //Check if any of the dates the room has been reserved for overlap with the requsted dates
            $not: {
                $elemMatch: {from: {$lt: new Date(toDate)}, to: {$gt: new Date(fromDate)}}
            }
        }        
        this.getRoomsByQuery(query, req, res);

    }
}

rooms.init();
module.exports = rooms;