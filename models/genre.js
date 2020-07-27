const Joi = require('joi');
const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
  name : {
    type:String,
    minlength: 1,
    maxlength: 15,
    uppercase:true,
    required: true,
    trim: true
  }
});
const Genre = mongoose.model('Genres', genreSchema);

  function validateMovie(movie) {
    const schema = Joi.object({
      "genre" : Joi.string().min(5).required()
    });
    return schema.validate(movie);
  }
  module.exports.genreSchema = genreSchema;
  module.exports.Genre = Genre;
  module.exports.validate = validateMovie;
  
