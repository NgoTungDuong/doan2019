const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    county: {type: String, required: true},
    ward: {type: String, required: true},
    }, {
        timestamps: true,
    });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;