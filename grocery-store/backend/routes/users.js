const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
    const { email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists.'});
        }
        const newUser = new User ({ email, password});
        await newUser.save();
        res.status(201).json({message:'User registered successfully.'});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message:'Registration failed.'});
    }
});

// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ email, password: hashedPassword });
//       await newUser.save();
//       res.status(201).json({ message: 'User registered successfully!' });
//     } catch (error) {
//       console.error('Error registering user:', error);
//       res.status(500).json({ message: 'Error registering user', error: error.message });
//     }
//   });

router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials.'});
        }
        res.status(200).json({ message: 'Login successful.', success: true });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({message: 'Login failed'});
    }
});

module.exports = router;