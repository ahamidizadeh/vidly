const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim : true
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim : true
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
      "isGold":Joi.boolean().required(),
      "name" : Joi.string().min(2).required(),
      "phone" : Joi.string().min(5).required()
    });
    return schema.validate(customer);
  }
  module.exports.Customer = Customer;
  module.exports.validate = validateCustomer;
