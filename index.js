const express = require('express');
const home = require('./routes/home');
const genres =require('./routes/genres')
const customers =require('./routes/customers')
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
.then(console.log('vasl shodim be mongo'))
.catch(err => console.log("nashod ke beshe", err));

app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.json());
app.use('/', home);
app.use('/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to the port : ${port}`));