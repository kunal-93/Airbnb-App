const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

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



app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))

app.use((req, res, next) => {
    if(req.session != null){
        res.locals.user = req.session.userInfo;
        // console.log(Object.keys(req.session.userInfo));
    }
    next();
})

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
