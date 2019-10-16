const mongoose = require('mongoose');

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

mongoose.model('Quote', QuoteSchema); /// returns a constructor