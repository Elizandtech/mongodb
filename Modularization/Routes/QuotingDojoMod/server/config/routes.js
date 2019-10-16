    // // returns an object with keys and functions(req, res) as their values.
//console.log('directory:' ,__dirname);
require('./mongoose.js');
const quotes = require('../controllers/quotes.js');
//,  // current path is server/routes; need .. to get into server folder.
    // mongoose = require('mongoose')//,
    //Quote = mongoose.model('Quote')     // get Schema

    // set the routes as a function that takes app as a parameter so don't have to require it.
module.exports = function(app){
    app.get('/', (req, res) => {
        quotes.index(req, res);
    })
    
    app.post('/quotes', (req, res) => {
        quotes.create(req, res);
    })
    
    app.get('/quotes', (req, res) => {
        quotes.display(req, res);
    })
}
