const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

require('dotenv').config({path:"./config/keys.env"})

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// load Controllers
const generalController = require('./controller/general');
const roomsController = require('./controller/rooms');
const userController = require('./controller/User');
// map controller to app object
app.use('/', generalController);
app.use('/rooms', roomsController);
app.use('/user', userController);

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    console.log(`Connected to Database`);
})
.catch(err=>{
    console.log(`Error occured ${err}`);
})

app.listen(port, () => {
    console.log(`Web app is running on port : ${port}`);
});
