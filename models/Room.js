const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roomSchema = new Schema({

    title:{
        type:String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:[
        {
            heading : {
                type: String,
                required: true,
            },
            paragraph : {
                type: String,
                required: true
            }
        }
    ] ,
    price:{
        type:Number,
        required: true
    },
    maxOccupancy:{
        type:Number,
        default: 2
    },
    bedRooms:{
        type: Number,
        default: 2
    },
    beds:{
        type: Number,
        default: 2
    },
    baths:{
        type: Number,
        default: 1
    },
    featured:{
        type:Boolean,
        default: false
    },
    reserved: [
        {
            from: {
                type: Date
            },
            to: {
                type: Date
            }
        }
    ],
    location:{
        type: String,
        required: true
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
});

const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;