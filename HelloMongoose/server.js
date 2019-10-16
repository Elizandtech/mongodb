const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/user_db', {useNewUrlParser: true, useUnifiedTopology: true});

//Create a Schema for Users
const UserSchema = new mongoose.Schema({        
    name: String,
    age: Number
   })
// create a constructor function for our model(class) and store in the variable 'User'.
const User = mongoose.model('User', UserSchema);
   
app.get('/', (req, res) => {  
    console.log("GET route");
    // retrieve an array of all the documents in the User collection.
    User.find()
    .then(data => {res.render("index", {users: data}); console.log('data from find',data);})
    .catch(err => res.json(err));
    var data;
    console.log('data on line 25', data);
    // res.render('index');
});

app.post('/users', (req, res) => {
    console.log("POST route");
    const user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
  // insert data into the database with save() , returns a promise
    var promise = user.save();
    promise.then(newUserData => console.log('user created: ', newUserData))  // executes when insert is successful
      .catch(err => console.log(err));          // executes if there is an error when inserting
    console.log('line 36') ;
    res.redirect('/');
  })
  
app.listen(8000, function() {
    console.log("Listening on port 8000");
})