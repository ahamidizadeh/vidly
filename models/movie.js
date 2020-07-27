const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title : {
      type: String,
      required: true,
      minlength:5,
      maxlength: 255,
      trim: true
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock :{
      type: Number,
      min: 0,
      max: 255,
      required: true
  },
  dailyRentalRate : {
      type: Number,
      required: true,
      min: 0 ,
      max: 255
  },
}));


function validateMovie(movie) {
    const schema = Joi.object({
      title : Joi.string().min(5).required(),
      genreId : Joi.string().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    });
    return schema.validate(movie);
  }
module.exports.Movie = Movie;
module.exports.validate = validateMovie;