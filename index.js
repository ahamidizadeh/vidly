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

app.get('/api/genres', (req, res) => {
  console.log('we connected...');
  res.send(movieGenres);
});

app.get('/api/genres/:id', (req, res) => {
    const movie = movieGenres.find(m => m.id === parseInt(req.params.id));
    if(!movie){
        res.status(404).send('This id does not exist, try another one.')
    }
    res.send(movie);
  });

// add a new genre
app.post('/api/genres/:id', (req, res) => {
  Object.assign(movieGenres, req.body);
  res.status(200).send("movie has been added, thank you:)\n" + JSON.stringify(movieGenres));
});
// update a gemre
app.put('/api/genres', (req, res) => {
  
});
//add 404 for movies to be updated that arent available