const mongoose = require('mongoose');

const Quote = mongoose.model('Quote');

module.exports = {
    index: function(req, res) {
        console.log("GET");
        res.render('index');
    },
    create: function(req, res) {
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
    },
    display: function(req, res) {
        console.log('GET /quotes');
        Quote.find().sort({createdAt: 'asc'})
        .then(data => {res.render("quotes", {quotes: data}); console.log('data from find',data);})
        .catch(err => res.json(err));
    }
};

