const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer : {
          type: new mongoose.Schema({
          name: {
              type: String,
              required: true,
              minlength: 5,
              maxlength: 50
          },
          isGold: {
              type: Boolean,
              required: true
          },
          phone: {
              type: String,
              required: true,
              minlength: 5,
              maxlength: 50
          }
      
    })},
  movie: {
          type: new mongoose.Schema({
          title: {
              type: String,
              required: true,
              trim : true,
              minlength: 0,
              maxlength: 255
          },
          dailyRentalRate: {
              type: Number,
              required: true,
              min: 0,
              max: 255
        },
      
  })},
  dateOut : {
      type: Date,
      required: true,
      default: Date.now
  },
  dateReturned: {
      type: Date
  },
  retalFee : {
      type: Number,
      min: 0
  }
}));
function validateRental(rental) {
    const schema = Joi.object({
        customerId : Joi.string().required(),
        movieId : Joi.string().required()
    });

    return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
