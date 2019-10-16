const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'animals',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
app.use(flash());

mongoose.connect('mongodb://localhost/pika_db', {useNewUrlParser: true});
// apply in-built mongoose validations in the SchemaType.
const PikaSchema = new mongoose.Schema({        // set Schema
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    fur_color: {
        type: String,
        required: true,
        minlength: 2
    }, 
    food: {
        type: String,
        required: true,
        enum: ['twigs', 'shrubs', 'flowers', 'grass', 'moss']
    }},
    {timestamps:true});

const Pika = mongoose.model('Pika', PikaSchema);        // get Schema

app.get('/', (req, res) => {
    console.log("GET /");
    Pika.find()
    .then((allpikas) => {res.render('index', {pikas: allpikas}); console.log('allpikas', allpikas);})
    .catch(err => res.json(err));
})

app.get('/pikas/new', (req, res) => {
    console.log('GET /pikas/new');
    res.render("addPika");
})

app.post('/pikas', (req, res) => {
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
})

app.get('/pikas/edit/:id', (req, res) => {
    console.log('GET /pikas/edit/:id');
    const { id } = req.params;
    console.log("The pika id requested is:", id);
    // get pika data by id:
    Pika.findById({_id: id})
    .then(getpika => {res.render('editPika', {pikainfo: getpika}); console.log('pika is: ', getpika);})
    .catch(err => res.json(err));
})

app.post('/pikas/:id', (req, res) => {
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
})

app.get('/pikas/:id', (req, res) => {
    console.log('GET /pikas/:id');
    const {id} = req.params;
    Pika.findById({_id: id})
    .then(getpika => {res.render('displayPika', {pikainfo: getpika}); console.log('pika is: ', getpika);})
    .catch(err => res.json(err));
});

app.get('/pikas/delete/:id', (req, res) => {
    console.log('DELETE');
    const {id} = req.params;
    Pika.findByIdAndRemove({_id: id})
    .then(deletedPika => {console.log('deleted_pika: line 118', deletedPika); res.redirect('/');})
    .catch(err => res.json(err));

    // another way to delete
    // returns { n: 1, ok: 1, deletedCount: 1 }
    // Pika.remove({_id: id})
    // .then(deletedPika => {console.log('deleted_pika: line 123', deletedPika); res.redirect('/');})
    // .catch(err => res.json(err));

    
    // // returns { _id: 5d78865770c26b7f25c9440a,
    // //     name: 'Balaji',
    // //     age: 38,
    // //     fur_color: 'black',
    // //     food: 'shrubs',
    // //     createdAt: 2019-09-11T05:29:59.317Z,
    // //     updatedAt: 2019-09-11T05:29:59.317Z,
    // //     __v: 0 }
    // Pika.findByIdAndDelete({_id: id})
    // .then(deletedPika => {console.log('deleted_pika: line 128', deletedPika); res.redirect('/');})
    // .catch(err => res.json(err));
});


app.listen(8000, function () {console.log('listening on port 8000')});