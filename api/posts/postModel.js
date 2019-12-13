const mongoose = require('mongoose'); 

const postSchema = new mongoose.Schema({
    transactionHash: {type: String, required: true},
    }, {
        timestamps: true,
    });

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;