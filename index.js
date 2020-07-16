const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`connected to the port : ${port}`));
app.use(express.json());


let movieGenres = [
    {id:1, name:"homealone", genre:"family"},
    {id:2, name:"Troy", genre:"Action"},
    {id:3, name:"Gladirator", genre:"Action"},
    {id:4, name:"StarWars", genre:"Science fiction"},
    {id:5, name:"Shrek", genre:"Animation"}
    ];
// how to show the array in a more readable way??
app.get('/api/genres', (req, res) => {
  console.log('we connected...');
  res.send(movieGenres);
});

app.get('/api/genres/:id', (req, res) => {
    const movie = movieGenres.find(m => m.id === parseInt(req.params.id));
    //add 404 for movies to be updated that arent available
    if(!movie){
        res.status(404).send('This id does not exist, try another one.')
    }
    res.send(movie);
  });

// Add a new genre
app.post('/api/genres', (req, res) => {
    //sample data : (req.body = {"name" : "lionking", "genre": "animation"})
    const movie = {
        "id" : movieGenres.length + 1,
        "name" : req.body.name,
        "genre" : req.body.genre
    }
    movieGenres.push(movie);
    res.status(200).send(JSON.stringify(movieGenres));
});
// update a genre
app.put('/api/genres/:id', (req, res) => {
  //sample data: {"updatedName": "Home Alone", "genre" : ""}
  if(parseInt(req.params.id) > movieGenres.length) {
    res.status(404).send('This id does not exist, try another one')
  } 
  // update the movie and send update list
  movieGenres[req.params.id-1].name = req.body.updatedName;
  movieGenres[req.params.id-1].genre = req.body.updatedGenre;
  res.send("Thanks! here is the updated list: " + JSON.stringify(movieGenres));
});
app.delete('/api/genres/:id', (req, res) => {
    if(parseInt(req.params.id) > movieGenres.length) {
        res.status(404).send('This id does not exist, try another one')
    }
    movieGenres.splice(parseInt(req.params.id)-1, 1);
    res.send(movieGenres);
    
})
