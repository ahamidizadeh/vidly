const express = require('express');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`connected to the port : ${port}`));
app.use(express.json());


let movieGenres = [
    {name:"homealone", genre:"family"},
    {name:"Troy", genre:"Action"},
    {name:"Gladirator", genre:"Action"},
    {name:"StarWars", genre:"Science fiction"},
    {name:"Shrek", genre:"Animation"}
    ];
// how to show the array in a more readable way??
app.get('/api/genres', (req, res) => {
  console.log('we connected...');
  res.send(movieGenres);
});

app.get('/api/genres/:idx', (req, res) => {
    const movie = movieGenres[parseInt(req.params.idx)-1];
    //add 404 for movies to be updated that arent available
    if(!movie){
        return res.status(400).send('This id does not exist, try another one.')
    }
    res.send(movie);
  });

// Add a new genre
app.post('/api/genres', (req, res) => {
    //sample data : (req.body = {"name" : "lionking", "genre": "animation"})
    const newMovie  = req.body;
    const result = validateMovie(newMovie)
    if(result.error){return res.status(400).send(result.error.details[0].message)
    }
    movieGenres.push(result.value);
    
    res.status(200).send(movieGenres);
});
// update a genre by id
app.put('/api/genres/:id', (req, res) => {
  //sample data: {"updatedName": "Home Alone", "genre" : ""}
  if(parseInt(req.params.id) > movieGenres.length) {
    res.status(404).send('This id does not exist, try another one')
  } 
  const {error} = validateMovie(req.body);
  if(error) {
    return res.status(400).send(error.details[0].message);
  }
  // update the movie and send update list
  movieGenres[req.params.id-1].name = req.body.updatedName;
  movieGenres[req.params.id-1].genre = req.body.updatedGenre;
  res.send(movieGenres);
});
//update by name
app.put('/api/genres', (req, res) => {
    /*using postman send a put request to 
    localhost:3000/api/genres/?searchBy=name 
    (name that you want to update its genre)*/

    //Also {"genre" : "Romance"} in the body and change format to json on postman
    const movieName = req.query.searchBy;
    const movie = movieGenres.find(m => m.name === movieName)
    const genreUpdate = req.body.genre;
    //update
    movie.genre = genreUpdate;
    //show updated version
    res.status(200).send(movie);

})
app.delete('/api/genres/:id', (req, res) => {
    if(parseInt(req.params.id) > movieGenres.length) {
        res.status(404).send('This id does not exist, try another one')
    }
    movieGenres.splice(parseInt(req.params.id)-1, 1);
    // change the rest of the id's to match the new list correct numbers***
    res.send(movieGenres);
})

// make a function to validate the input with Joi
function validateMovie(movie) {
  const schema = Joi.object({
    "name" : Joi.string().min(2).required(),
    "genre" : Joi.string().min(5).required()
  });

  return schema.validate(movie);
}
