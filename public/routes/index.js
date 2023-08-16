const express = require('express');

const notes = require('./assets/pages/notes.html');

const app = express()

app.use('/notes', notes);