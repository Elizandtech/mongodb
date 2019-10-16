const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
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

mongoose.connect('mongodb://localhost/message_db', {useNewUrlParser: true});
const CommentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Comments must have a creator. Please add your name!"], minlength: [2, "Names must have at least 2 characters"]},
    comment: {type: String, required: [true, "Why no content?"]}
    },{timestamps: true})

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Messages must have a creator. Please add your name!"], minlength: [2, "Names must have at least 2 characters"]},
    message: {type: String, required: [true, "Why no content?"]},
    comments: [CommentSchema]
  }, {timestamps: true})


const Message = mongoose.model('Message', MessageSchema);
const Comment = mongoose.model('Comment', CommentSchema);

app.get('/messages', (req, res) => {
    console.log('GET /messages');
    Message.find()
    .then(allMessages => {console.log('all_messages', allMessages); res.render('index', {allmess: allMessages});})
    .catch(err => res.json(err));
})

app.post('/messages', (req, res) => {
    console.log('POST /messages');
    // const message = new Message(req.body);
    Message.create(req.body)
    .then(newmsg => res.redirect('/messages'))
    .catch(err => {
        console.log("We have an error!Yay!", err);
        for (var key in err.errors) {
            req.flash('mess', err.errors[key].message);
            console.log('flash', err.errors[key].message);
        }
        res.redirect('/messages');
    });
})

app.post('/comments/:id', (req, res) => {
    console.log('POST /comments/:id');
    console.log('new comment', req.body);
    console.log('id', req.params.id);
    Comment.create(req.body)
        .then(comment => {
            console.log('comment', comment);
            Message.findByIdAndUpdate({_id: req.params.id}, {$push: {comments: comment}})
            .then(updatedmessage => {console.log('updated_mess:',updatedmessage); res.redirect('/messages');})
            .catch(err => res.json(err));
        })
        .catch(err => {
            console.log("We have an error!Yay!", err);
            for (var key in err.errors) {
                req.flash('comm', err.errors[key].message);
                console.log('flash', err.errors[key].message);
            }
            res.redirect('/messages');
        });
   })  

app.listen(8000, function() {console.log('listening on port 8000')});