const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name 
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(400).send('Invalid movie ID');

    movie.title = req.body.title;
    movie.genre._id = req.body.genreId;
    movie.numberInStock = req.body.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate;
    movie = await movie.save();
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const deletedMovie = await Movie.findByIdAndRemove(req.params.id);
    if(!deletedMovie) return res.status(400).send('INVALID ID');

    res.send(`deleted movie: ${deletedMovie}, thank you!`)

})

module.exports = router;