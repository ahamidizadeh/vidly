const Joi = require('joi');
const mongoose = require('mongoose');


const MovieGenres = mongoose.model('Movie Genres', new mongoose.Schema({
    name : {
      type:String,
      minlength: 1,
      maxlength: 15,
      uppercase:true,
      required: true,
      trim: true
    },
    genre : {
      type:String,
      minlength: 1,
      maxlength: 15,
      uppercase:true,
      required: true,
      trim: true
    }
  }));

  function validateMovie(movie) {
    const schema = Joi.object({
      "name" : Joi.string().min(2),
      "genre" : Joi.string().min(5).required()
    });
    return schema.validate(movie);
  }

  module.exports.MovieGenres = MovieGenres;
  module.exports.validate = validateMovie;
  
