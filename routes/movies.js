const express = require('express');
const router = express.Router();
const {MovieGenres, validate} = require('../models/movie');
const mongoose = require('mongoose');

            /*using postman send a put request to 
          localhost:3000/api/genres/?searchBy=name */
router.get('/', async(req, res) => {
  const movies = await MovieGenres.find().sort('name');
  res.send(movies);
  });
  
router.get('/:id', async (req, res) => {
  const movie = await MovieGenres.findById(req.params.id);
  console.log(movie)
  if(!movie) {
    return res.status(400).send('This is ID is not valid! please use the correct movie ID.')
  }
  res.send(movie);
    });
  
  // Add a new genre
router.post('/', async (req, res) => {
  const {error} = validate(req.body)
  if(error){return res.status(400).send(error.details[0].message)}

  let movie = new MovieGenres({
    name: req.body.name,
    genre: req.body.genre
  });
  movie = await movie.save();
  res.status(200).send(movie);
});
  // update a genre by id
router.put('/:id', async (req, res) => {
  //validate input from user
  const {error} = validate(req.body);
  if(error) {
    return res.status(400).send(error.details[0].message);
  }
  //update db
  const updatedMovie = await MovieGenres.findByIdAndUpdate(req.params.id, 
                        {$set: {genre: req.body.genre, name: req.body.name}},
                        {new:true});
  if(!updatedMovie){res.status(400).send('This is ID is not valid! please use the correct movie ID.')}
  res.send(updatedMovie);
});
//update by name
router.put('/', async (req, res) => {
  //use the query ?searchBy=name to update the movie you want to
  //req.body ===> {"genre" : "updated genre"}
  const {error} = validate(req.body);
  if(error) {
   return res.status(400).send(error.details[0].message);
  }
 
  const movie = await MovieGenres.find({name: req.query['searchBy'].toUpperCase()});
  if(!movie){
    return res.status(400)
    .send("this movie is not in the collection, use correct spelling or try another movie")
  }
  const updatedMovie = await MovieGenres.findByIdAndUpdate(movie[0]._id, {
    $set: {genre: req.body.genre}}, {new: true});
    res.send(updatedMovie);
  });

router.delete('/:id', async (req, res) => {
  const deletedMovie = await MovieGenres.findByIdAndRemove(req.params.id);
  if(!deletedMovie){return res.status(400).send('This id does not exist, try another one')}
  res.status(200).send(`deleted movie: ${deletedMovie}`);
});

module.exports = router;
