const express = require('express');
const home = require('./routes/home');
const movies =require('./routes/movies')
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
.then(console.log('connected to mongodb'))
.catch(err => console.log("could not connect to mongodb", err));

app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.json());
app.use('/', home);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to the port : ${port}`));