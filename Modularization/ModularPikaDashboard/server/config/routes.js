// // returns an object with keys and functions(req, res) as their values.
// const models = require('./mongoose.js');
// const quotes = require('../controllers/quotes.js')(models.quote);//,  // current path is server/routes; need .. to get into server folder.
const pikas = require('../controllers/pikas.js') // returns object

// set the routes as a function that takes app as a parameter so don't have to require it.
module.exports = function(app){
    app.get('/', (req, res) => {
        pikas.index(req, res);
    })
    app.get('/pikas/new', (req, res) => {
        pikas.new(req, res);
    })
    app.post('/pikas', (req, res) => {
        pikas.create(req, res);
    })
    app.get('/pikas/edit/:id', (req, res) => {
        pikas.edit(req, res);
    })
    app.post('/pikas/:id', (req, res) => {
        pikas.update(req, res);
    })
    app.get('/pikas/:id', (req, res) => {
       pikas.displayone(req, res);
    });
    app.get('/pikas/delete/:id', (req, res) => {
        pikas.delete(req, res);
    });
}



