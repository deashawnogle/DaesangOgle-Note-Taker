const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;
let api = require('./db/db.json');
//const { Notes } = require('@material-ui/icons');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/send', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(api)
});

app.post('/api/notes', (req, res) => {
    req.body.id = api.length + 1
    api.push(req.body);
    res.json(api)
    fs.writeFileSync('./db/db.json', JSON.stringify(api, null, '\t'))
});

app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)

    var newNotes = []
    for (let i = 0; i < api.length; i++) {
        if(id !== api[i].id) {
            console.log('keep em!!', api[i])
            newNotes.push(api[i])
        } else {
            console.log('DELETE EM!!', api[i])
        }
        
    }

    api = newNotes
    console.log('all the notes we anted to kep!', newNotes)
    res.json(newNotes)
})

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`)
);

