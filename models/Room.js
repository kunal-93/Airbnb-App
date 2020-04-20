const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roomSchema = new Schema({

    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    isAvailable:{
        type:Boolean,
        default: true
    },
    featured:{
        type:Boolean,
        default: false
    },
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