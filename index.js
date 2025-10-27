const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const User = require('./models/User');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});

const upload = multer({ storage: storage });

app.post('/register', upload.single('myfile'), async (req, res) => {
    try {
        const {
            name, lastn, phone, email, age, high, weight, country, school, city, hobbies,
            job, gender, myreligion, partnerreligion, aboutme, lookingfor, haskalaa
        } = req.body;

        const photo = req.file ? req.file.filename : null;

        const newUser = new User({
            name,
            lastn,
            phone,
            email,
            age,
            high,
            weight,
            country,
            school,
            city,
            hobbies,
            job,
            gender,
            myreligion,
            partnerreligion,
            aboutme,
            lookingfor,
            haskalaa: Array.isArray(haskalaa) ? haskalaa : [haskalaa],
            photo,
            approved: false,
            status: 'pending',
            password: '',
        });

        await newUser.save();
        res.redirect('https://date-hobbie.site/register-success');
    } catch (error) {
        console.error(error);
        res.redirect('https://date-hobbie.site/register-failed');
    }
});

// Simple test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start server
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://davidu7777:t75Pw8Ccf07wWLqk@cluster0.adux2qw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



