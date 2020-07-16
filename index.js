const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`connected to the port : ${port}`));
app.use(express.json());


let movieGenres = {
    "Troy" : "Action",
    "Star Wars" : "Science fiction",
    "Jigsaw" : "Thriller",
    "Home Alone" : "PG",
    "Shrek" : "Animation"
};

app.get('/api/genres', (req, res) => {
  console.log('we connected...');
  res.send(movieGenres);
});
// add a new genre
app.post('/api/genres', (req, res) => {
  Object.assign(movieGenres, req.body);
  res.status(200).send("movie has been added, thank you:)\n" + JSON.stringify(movieGenres));
});
// update a gemre
app.put('/api/genres', (req, res) => {
  
});