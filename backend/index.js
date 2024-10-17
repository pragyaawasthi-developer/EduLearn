// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mernstack:mern@mern.tzffmt0.mongodb.net/NewBatch?retryWrites=true&w=majority&appName=mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Use routes
app.use('/api/users', userRoutes);

const PORT = 5000; // You can change the port if needed
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
