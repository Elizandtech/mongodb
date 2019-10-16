const Pika = require('../models/pika.js');

// function(Pika)
module.exports = {
    // return {
    index: function(req, res) {
        console.log("GET /");
        Pika.find()
        .then(allpikas => {res.render('index', {pikas: allpikas}); console.log('allpikas', allpikas);})
        .catch(err => res.json(err));
    },
    new: function(req, res) {
        console.log('GET /pikas/new');
        res.render("addPika");
    },
    create: function(req, res) {
        console.log('POST');
        const pika = new Pika(req.body);
        pika.save()         // insert pika into db
        .then(newpika => {console.log('newuser', newpika); res.redirect('/');})
        .catch(err => {
            console.log("We have an error!Yay!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('pika', err.errors[key].message);
                console.log('flash', err.errors[key].message);
            }
            res.redirect('/pikas/new');
        });
    },
    edit: function(req, res) {
        console.log('GET /pikas/edit/:id');
        const { id } = req.params;
        console.log("The pika id requested is:", id);
        // get pika data by id:
        Pika.findById({_id: id})
        .then(getpika => {res.render('editPika', {pikainfo: getpika}); console.log('pika is: ', getpika);})
        .catch(err => res.json(err));
    },
    update: function(req, res) {
        console.log('POST /pikas/:id');
        const {id} = req.params;
        console.log("The pika id requested is:", id);
        Pika.findById({_id: id})
        .then(updatepika => {
            updatepika.name = req.body.name;
            updatepika.age = req.body.age;
            updatepika.fur_color = req.body.fur_color;
            updatepika.food = req.body.food;
            return updatepika.save();
        })
        .then(updatedpika => {console.log('updated_pika', updatedpika); res.redirect('/');})
        .catch(err => {
            console.log("We have an error!Yay!", err);
            for (var key in err.errors) {
                req.flash('pika_edit', err.errors[key].message);
                console.log('flash', err.errors[key].message);
            }
            res.redirect('/pikas/edit/'+id);
        });
    },
    displayone: function(req, res) {
        console.log('GET /pikas/:id');
        const {id} = req.params;
        Pika.findById({_id: id})
        .then(getpika => {res.render('displayPika', {pikainfo: getpika}); console.log('pika is: ', getpika);})
        .catch(err => res.json(err));
    },
    delete: function(req, res) {
        console.log('DELETE');
        const {id} = req.params;
        Pika.findByIdAndRemove({_id: id})
        .then(deletedPika => {console.log('deleted_pika: line 118', deletedPika); res.redirect('/');})
        .catch(err => res.json(err));
    }
}; 
// }

