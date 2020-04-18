const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({

    FirstName:{
        type:String,
        required: true
    },
    LastName:{
        type:String,
        required: true
    },
    Email:
    {
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type: String,
        required: true
    },
    Mobile:
    {
        type: Number,
        required: false,
        unique:true
    },
    Bookings:
    {
        type: Array
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
});

userSchema.pre("save", function(next){
    bcrypt.genSalt(10)
    .then((salt) => {
        bcrypt.hash(this.Password, salt)
        .then((encryptedPassword) => {
            this.Password = encryptedPassword;
            next();
        })
        .catch(err=>console.log(`Error while hashing ${err}`));
    })
    .catch(err=>console.log(`Error while salt generation ${err}`))
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;