const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'quotes',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
app.use(flash());

mongoose.connect('mongodb://localhost/quote_db', {useNewUrlParser: true});
// apply in-built mongoose validations in the SchemaType.
const QuoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    quote: {
        type: String,
        required: true,
        minlength: 2
    }}, 
    {timestamps:true});

const Quote = mongoose.model('Quote', QuoteSchema);

app.get('/', (req, res) => {
    console.log("GET");
    res.render('index');
})

app.post('/quotes', (req, res) => {
    console.log('POST');
    const quote = new Quote(req.body);
    quote.save()
    .then(newuser => {console.log('newuser', newuser); res.redirect('/quotes');})
    .catch(err => {
        console.log("We have an error!Yay!", err);
        // adjust the code below as needed to create a flash message with the tag and content you would like
        for (var key in err.errors) {
            req.flash('quote', err.errors[key].message);
            console.log('flash', err.errors[key].message);
        }
        res.redirect('/');
    });
})

app.get('/quotes', (req, res) => {
    console.log('GET /quotes');
    Quote.find().sort({createdAt: 'asc'})
    .then(data => {res.render("quotes", {quotes: data}); console.log('data from find',data);})
    .catch(err => res.json(err));
})

app.listen(8000, function () {console.log('listening on port 8000')});