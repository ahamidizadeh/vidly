const express = require('express');
const router = express.Router();

let movieGenres = [
    {id: 1, name:"homealone", genre:"family"},
    {id: 2,name:"Troy", genre:"Action"},
    {id: 3,name:"Gladirator", genre:"Action"},
    {id: 4,name:"StarWars", genre:"Science fiction"},
    {id: 5,name:"Shrek", genre:"Animation"}
    ];

router.get(('/'), (req, res) =>{
    res.render('index', {title: "vidly", message:"WELCOME to vidly"});
});

module.exports = router;
