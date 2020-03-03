const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

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

// map controller to app object
app.use('/', generalController);
app.use('/rooms', roomsController);


app.listen(port, () => {
    console.log(`Web app is running on port : ${port}`);
});
