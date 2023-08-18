const notes = require('express').Router();
const { v4: uuidv4} = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET route to retrieve all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET route to retrieve a specific note
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json("No notes were found with that ID :(");
        });
});

// POST route
notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, "./db/db.json");
        res.json(`Note added succesfully! LETS GO`);
    } else {
        res.error('LOL nope')
    }
});

// BONUS: Added DELETE Route
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', result);
            res.json(`Item ${noteId} has been dumped...like my heart...`)
        });
});

module.exports = notes;