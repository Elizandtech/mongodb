const mongoose = require('mongoose');

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

module.exports= mongoose.model('Pika', PikaSchema); 

