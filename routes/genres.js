const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');

            /*using postman send a put request to 
          localhost:3000/api/genres/?searchBy=name */
router.get('/', async(req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
  });
  
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if(!genre) {
    return res.status(400).send('This is ID is not valid! please use the correct movie ID.')
  }
  res.send(genre);
    });
  
  // Add a new genre
router.post('/', async (req, res) => {
  const {error} = validate(req.body)
  if(error){return res.status(400).send(error.details[0].message)}

  let genre = new Genre({
    name: req.body.genre
  });
  genre = await genre.save();
  res.status(200).send(genre);
});
  // update a genre by id
router.put('/:id', async (req, res) => {
  //validate input from user
  const {error} = validate(req.body);
  if(error) {
    return res.status(400).send(error.details[0].message);
  }
  //update db
  const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, 
                        {$set: {name: req.body.genre}},
                        {new:true});
  if(!updatedGenre){res.status(400).send('This is ID is not valid! please use the correct movie ID.')}
  res.send(updatedGenre);
});
//update by name
router.put('/', async (req, res) => {
  //use the query ?searchBy=name to update the movie you want to
  //req.body ===> {"genre" : "updated genre"}
  const {error} = validate(req.body);
  if(error) {
   return res.status(400).send(error.details[0].message);
  }
 
  const genre = await Genre.find({name: req.query['searchBy'].toUpperCase()});
  if(!genre){
    return res.status(400)
    .send("this movie is not in the collection, use correct spelling or try another movie")
  }
  const updatedGenre = await Genres.findByIdAndUpdate(genre[0]._id, {
    $set: {name: req.body.genre}}, {new: true});
    res.send(updatedGenre);
  });

router.delete('/:id', async (req, res) => {
  const deletedGenre = await Genre.findByIdAndRemove(req.params.id);
  if(!deletedGenre){return res.status(400).send('This id does not exist, try another one')}
  res.status(200).send(`deleted movie: ${deletedMovie}`);
});

module.exports = router;
