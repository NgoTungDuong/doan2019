const express = require('express');
const postModel = require('./model')
const postRouter = express.Router();

postRouter.post('/', async (req, res) => {
    try {
        const postInfo = req.body;
        // sau khi them bai viet moi, luu thong tin author cua user vua dang nhap
        const newPost = await postModel.create({
            postInfo
        });
        res.status(201).json({ 
            success: true,
            data: newPost
        });
        
    } catch (error) {
        res.status(error.status || 500).end(error.message || "Internal server error");
    }
});

module.exports = postRouter;