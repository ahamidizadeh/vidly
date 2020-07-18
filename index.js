const express = require('express');
const home = require('./routes/home');
const movies =require('./routes/movies')
const app = express();

app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.json());
app.use('/', home);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to the port : ${port}`));