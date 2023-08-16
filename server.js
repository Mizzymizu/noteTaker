const express = require('express');
const path = require('path');
const api = require('./public/routes/index.js')


const PORT = process.env.PORT || 3001;

const app = express();


// GET Route
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);



// PORT
app.listen(PORT, () =>
    console.log(`You can now view the page at http://localhost:${PORT}`)
);