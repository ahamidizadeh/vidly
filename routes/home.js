const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(('/'), (req, res) =>{
    res.render('index', {title: "vidly", message:"WELCOME to vidly"});
});

module.exports = router;
