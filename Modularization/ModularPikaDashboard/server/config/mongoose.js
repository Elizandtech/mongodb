const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pika_db', {useNewUrlParser: true});

// var models_path = path.join(__dirname, './../models');
// var models = {};  // object
// // read all of the files in the models_path and require (run) each of the javascript files
// fs.readdirSync(models_path).forEach(function(file) {
//   if(file.indexOf('.js') >= 0) {
//     var modelname = file.split('.')[0];
//     console.log('Reading model:',modelname);
//     // require the file (this runs the model file which registers the schema)
//     models[modelname] = require(models_path + '/' + file);   // set key in models object to the name of file, value is mongoose.model('Quote', QuoteSchema); 
//    }
// });
// module.exports = models;