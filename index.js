const express = require('express');
const app = express();
app.listen(5000, () => console.log('connected'));

app.get('/', (req, res) => 
  console.log('we connected...')
)
