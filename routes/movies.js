const express = require('express');
const Joi = require('joi');
const router = express.Router();

let movieGenres = [
    {id: 1, name:"homealone", genre:"family"},
    {id: 2,name:"Troy", genre:"Action"},
    {id: 3,name:"Gladirator", genre:"Action"},
    {id: 4,name:"StarWars", genre:"Science fiction"},
    {id: 5,name:"Shrek", genre:"Animation"}
    ];

    router.get('/', (req, res) => {
        console.log('we connected...');
        res.send(movieGenres);
        // how to show the array in a more readable way??
      });
      
    router.get('/:id', (req, res) => {
        const movie = movieGenres.find(m => m.id === parseInt(req.params.id));
          //add 404 for movies to be updated that arent available
        if(!movie){
            return res.status(400).send('This id does not exist, try another one.')
        }
        res.send(movie);
        });
      
      // Add a new genre
    router.post('/', (req, res) => {
        //sample data : (req.body = {"name" : "lionking", "genre": "animation"})
        const {error} = validateMovie(req.body)
        if(error){return res.status(400).send(error.details[0].message)}
        
        const newMovie  = {
          id: movieGenres.length+1,
          name: req.body.name,
          genre: req.body.genre
        }
        movieGenres.push(newMovie);
        
        res.status(200).send(movieGenres);
    });
      // update a genre by id
    router.put(':id', (req, res) => {
      //sample data: {"updatedName": "Home Alone", "genre" : ""}
      const movie = movieGenres.find(m => m.id === parseInt(req.params.id));
      if(!movie) {
        res.status(404).send('This id does not exist, try another one')
      } 
      const {error} = validateMovie(req.body);
      if(error) {
        return res.status(400).send(error.details[0].message);
      }
      // update the movie and send update list
      movieGenres[req.params.id-1].name = req.body.name;
      movieGenres[req.params.id-1].genre = req.body.genre;
      res.send(movieGenres);
    });
    //update by name
    router.put('/', (req, res) => {
        /*using postman send a put request to 
        localhost:3000/api/genres/?searchBy=name 
        (name that you want to update its genre)*/
    
        //Also {"genre" : "Romance"} in the body and change format to json on postman
        const movieName = req.query.searchBy;
        const movie = movieGenres.find(m => m.name === movieName);
    
        const {error} = validateMovie(req.body);
          if(error) {
           return res.status(400).send(error.details[0].message);
          }
        const genreUpdate = req.body.genre;
        const nameUpdate = req.body.name;
        //update
        movie.genre = genreUpdate;
        movie.name = nameUpdate;
        //show updated version
        res.status(200).send(movie);
    
    })
    router.delete('/:id', (req, res) => {
        if(parseInt(req.params.id) > movieGenres.length) {
            return res.status(404).send('This id does not exist, try another one')
        }
        movieGenres.splice(parseInt(req.params.id)-1, 1);
        // change the rest of the id's to match the new list correct numbers
        for(let i = parseInt(req.params.id)-1; i < movieGenres.length; i++) {
          movieGenres[i]["id"] -= 1;
        }
        res.send(movieGenres);
    })
    // make a function to validate the input with Joi
    function validateMovie(movie) {
      const schema = Joi.object({
        "name" : Joi.string().min(2),
        "genre" : Joi.string().min(5).required()
      });
      return schema.validate(movie);
    }

module.exports = router;
