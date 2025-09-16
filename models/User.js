const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    lastn: String,
    phone: Number,
    email: String,
    age: Number,
    high: String,
    weight: String,
    country: String,
    school: String,
    city: String,
    hobbies: String,
    image: {
        type: String,
        required: true
    },
    approved: Boolean,
    password: String,
    status: String,
    haskalaa: [String],
    job: String,
    gender: String,
    myreligion: String,
    partnerreligion: String,
    aboutme: String,
    lookingfor: String
});

module.exports = mongoose.model('User', userSchema);






