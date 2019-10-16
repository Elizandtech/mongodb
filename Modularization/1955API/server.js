const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/1955_db', {useNewUrlParser: true});

const PersonSchema = new mongoose.Schema({name: {type: String,}},{timestamps:true});

const Person = mongoose.model('Person', PersonSchema); 

app.get('/', (req, res)=>{
    console.log("GET /");
    Person.find()
    .then(allpeople => {res.json(allpeople); console.log('allpeople', allpeople);})
    .catch(err => res.json(err));
})

app.get('/new/:name', (req, res)=>{
    console.log('GET /new/:name');
    const {name} = req.params;
    const person = new Person({name: name});
    person.save()        
    .then(newperson => {
        console.log('newperson', newperson); 
        res.json(name + ' has been added');
    })
    .catch(err => res.json(err));
})

app.get('/:name', (req, res)=>{
    console.log('GET /:name');
    const {name} = req.params;
    Person.findOne({name: name})
    .then(getperson => {res.json(getperson); console.log('person is: ', getperson);})
    .catch(err => res.json(err));
})

app.get('/remove/:name', (req, res)=>{
    console.log('GET /remove');
    const {name} = req.params;
    Person.findOneAndRemove({name: name})
    .then(deletedPerson=> {res.json(name + ' has been removed'); console.log('deleted person 39',deletedPerson );})
    .catch(err => res.json(err));

})

app.listen(8000, function () {console.log('listening on port 8000')});




// require('./server/config/mongoose.js');

// require('./server/config/routes.js')(app);