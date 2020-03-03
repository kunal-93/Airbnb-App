const rooms = {
    
    roomListing :  [],
    featuredRooms : [],

    init(){ 
    
        const allRooms =  [
            {
                "id" : 1,
                "name" : "Entire apartment hosted by Paige",
                "imagePath" : "img/room1.jpg",
                "description" : "Spacious Luxury room for family vacation. 4 guests . 2 bedrooms . 1 kitchen . 2 bath",
                "price" : 130,
                "rating": 4.7,
                "ratingsCount": 342,
                "featured": true
            },
            {
                "id" : 2,
                "name" : "Modern Condo",
                "imagePath" : "img/room2.jpg",
                "description" : "Clean, cozy condo. 3 guests . 1 bedroom . 1 kitchen . 1 bath",
                "price" : 150,
                "rating": 4.5,
                "ratingsCount": 222,
                "featured": true
            },
            {
                "id" : 3,
                "name" : "Entire Apartment",
                "imagePath" : "img/room3.jpg",
                "description" : "Entire apartment hosted by Paige. 4 guests . 1 bedroom . 1 kitchen . 1 bath",
                "price" : 170,
                "rating": 4.2,
                "ratingsCount": 213,
                "featured": true
            },
            {
                "id" : 4,
                "name" : "Cozy Condo hosted by Paige",
                "imagePath" : "img/room4.jpg",
                "description" : "Spacious Luxury room for couples. 2 guests . 1 bedroom . 1 kitchen . 1 bath",
                "price" : 120,
                "rating": 3.9,
                "ratingsCount": 263,
                "featured": false
            },
            {
                "id" : 5,
                "name" : "Apartment",
                "imagePath" : "img/room5.jpg",
                "description" : "Spacious Luxury room for family vacation. 4 guests . 2 bedroom . 1 kitchen . 2 bath",
                "price" : 95,
                "rating": 4.0,
                "ratingsCount": 112,
                "featured": false
            },
            {
                "id" : 6,
                "name" : "Entire Apartment",
                "imagePath" : "img/room6.jpg",
                "description" : "Spacious Luxury room for family vacation. 3 guests . 1 bedroom . 1 kitchen . 1 bath",
                "price" : 117,
                "rating": 3.5,
                "ratingsCount": 362,
                "featured": false
            }
        ]

        allRooms.forEach(room =>  {
            this.roomListing.push(room);
            if(room.featured)
                this.featuredRooms.push(room);
        });

    },
    
    getAllRooms(){
        return this.roomListing;
    },

    getFeaturedRooms(){
        return this.featuredRooms;
    }
}

rooms.init();
module.exports = rooms;