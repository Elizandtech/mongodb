const express = require("express");
// const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/views'))
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'quotes',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
app.use(flash());

// const models = require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);   // returns a function that takes app as an argument.

app.listen(8000, function () {console.log('listening on port 8000')});