const express = require('express');
const sql = require('mssql');
const config = {
    user: 'DESKTOP-8VPMVQN\yiyih',
    // password: 'mypassword',
    server: 'DESKTOP-8VPMVQN\SQLEXPRESS', 
    database: 'Math Notes' 
};


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

console.log("reached here");
// server started

app.post('/rref', (req, res) => {
    console.log("made it in here");
    const matrixArray = req.body.matrixArray;

    console.log("back-end server");
    console.info(matrixArray);

    res.json({ err: "not done yet" });
});

app.get('/grabNote', (req, res) => {
    console.log("grabbing note");

    // access database and retrieve notes
    // TODO
});

app.post('/notes', (req, res) => {
    console.log("here");

    const newNote = req.body.newNote;

    // add note to database
    // TODO
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}. URL open on http://localhost:${PORT}/`);
});