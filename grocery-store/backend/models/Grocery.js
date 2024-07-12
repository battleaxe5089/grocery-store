const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
  });
  
  const grocerySchema = new mongoose.Schema({
    department: String,
    items: [itemSchema]
  });

const Grocery = mongoose.model('Grocery', grocerySchema);

module.exports = Grocery;