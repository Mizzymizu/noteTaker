const express = require('express');
const path = require('path');
const api = require('./routes/index.js')


const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));


// GET Route
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// WILDCARD Route for redirecting
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


// PORT
app.listen(PORT, () =>
    console.log(`You can now view the page at http://localhost:${PORT}`)
);