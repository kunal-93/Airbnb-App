const {searchRooms} = require("../models/Swagger");
const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'Airbnb Clone', 
        version: '1.0.0',
        description: 'A room booking  web Application inspired by Airbnb',
        contact: {
            name: "Kunal Dhawan",
            email: "kunaldhawan0212@gmail.com"
        },
        servers: ["http://localhost:3000"]
    },
    definitions:{
        ...searchRooms
    }
};

const swaggerOptions = {
    swaggerDefinition: swaggerDefinition,
    apis: ['controller/routes/*.js']
}



module.exports = {
    swaggerOptions: swaggerOptions
}