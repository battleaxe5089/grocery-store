const express = require('express');
const router = express.Router();
const Grocery = require('../models/Grocery');

router.get('/', async (req, res) => {
  const { category } = req.query;
  console.log(`Fetching groceries for department: ${category}`);
  try {
    const regex = new RegExp(`^${category}$`, 'i');
    console.log(`Regex for department search: ${regex}`);
    const department = await Grocery.findOne({ department: regex }).lean(); // Add .lean() for plain JavaScript object
    if (department) {
      console.log('Department document found:', department);
      if (Array.isArray(department.items)) {
        console.log('Groceries fetched from database:', department.items);
        res.json(department.items);
      } else {
        console.log('No items array found in department document:', department.items);
        res.json([]); // Return an empty array if no items found
      }
    } else {
      console.log('No department document found for this category');
      res.json([]); // Return an empty array if no items found
    }
  } catch (err) {
    console.error('Error fetching groceries:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

