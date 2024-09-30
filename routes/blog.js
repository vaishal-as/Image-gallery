const express = require('express');
const auth = require('../routes/auth');
const router = express.Router();
const mongoose = require("mongoose")
// Get all blogs (public route)
router.get('/', async (req, res) => {
    const result = await mongoose.connection.db.collection("blog").find({}).toArray();
    res.json({ message: "List of all blogs",result });
});

// Create a new blog (protected route)
router.post('/post', auth, async (req, res) => {
    const { title, content } = req.body;
    mongoose.connection.db.collection("blog").insertOne({title:title,content:content}).then((res)=>{
        console.log(res);
    })
    res.status(201).json({ message: 'Blog created successfully'});
});

module.exports = router;
