const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const bcrypt = require("bcrypt");
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'messages',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
app.use(flash());

mongoose.connect('mongodb://localhost/auth_db', {useNewUrlParser: true});

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: [true, "First name cannot be blank"], 
        minlength: [2, "First name must have at least 2 characters"]
    },
    last_name: {
        type: String, 
        required: [true, "Last name cannot be blank"], 
        minlength: [2, "Last name must have at least 2 characters"]
    },
    email: {
        type: String, 
        required: [true, "Email cannot be blank"]
    },
    password: {
        type: String, 
        required: [true, 'Must include password'], 
        minlength: [8, "Password must be at least 8 characters."]
    },
    birthday: {
        type: Date, 
        required: [true, "Please include a birthday"], 
        max: Date.now()}
    },
    {timestamps: true})

// UserSchema.path('email').required(true, 'User email cannot be blank');

const User = mongoose.model('User', UserSchema);

app.get('/', (req,res)=> {
    console.log('GET /');
    res.render('loginReg');
})

app.post('/registration', (req,res)=> {
    console.log('POST /registration');
    console.log('req body', req.body);
    User.find({email: req.body.email})
        .then(user => {
            console.log('User.find result: ', user);
            if (user.length > 0) {
                req.flash('email', 'Email taken')
                res.redirect('/');
            } 
            return User.create(req.body);
            })
        .then(newUser => {
            console.log('new user: ', newUser);
            // hash the password of the new user
            bcrypt.hash(req.body.password, 10)
            .then(hashed_password => {
                newUser.password= hashed_password;
                console.log('user after hash: ', newUser)
                newUser.save()
                .then(user => {
                    // req.session.user_id = user._id;
                    req.session.email = user.email;
                    console.log('session', req.session);
                    res.redirect('/user');
                })
                .catch(err => {
                    console.log("We have an error! Yay!", err);
                    for (var key in err.errors) {
                        console.log('key', key);
                        req.flash('registration', err.errors[key].message);
                        console.log('flash', err.errors[key].message);
                    }
                    res.redirect('/');
                });
            })
            .catch(error => {});
        })
        .catch(err => {
            console.log("We have an error! Yay!", err);
            for (var key in err.errors) {
                console.log('key', key);
                req.flash('registration', err.errors[key].message);
                console.log('flash', err.errors[key].message);
            }
            res.redirect('/');
        });
        
})

// app.post('/login', (req,res)=> {
    // bcrypt.compare('password_from_form', 'stored_hashed_password')
    // .then(result => {
         
    // })
    // .catch(error => {
         
    // })
    
// })

app.get('/user', (req,res)=> {
    console.log("GET /user");
    User.findOne({email: req.session.email})
    .then(user => {console.log('user in GET /user', user); res.render('display', {userinfo: user});})
    .catch(err => res.json(err));
}) 

app.listen(8000, function () {console.log('listening on port 8000')});