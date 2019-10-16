const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/views'))
app.use(bodyParser.urlencoded({extended: true}));   //parse data from a post request
app.use(session({
    secret: 'animals',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
app.use(flash());

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);

app.listen(8000, function () {console.log('listening on port 8000')});