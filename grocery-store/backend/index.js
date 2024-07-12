const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); 

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/grocery-store', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());

const groceryRoutes = require('./routes/groceries');
app.use('/api/groceries', groceryRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);


// starting server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})