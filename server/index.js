const express = require('express');
const sql = require('mssql/msnodesqlv8');
const config = {
    user: 'DESKTOP-8VPMVQN\\yiyih',
    server: 'DESKTOP-8VPMVQN\\SQLEXPRESS', 
    database: 'Math Notes',
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
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
    // access database and retrieve notes
    sql.connect(config, function(err) {
        if (err) {
            console.log(err);
            res.json({ err: 'Could not access database' });
        } else {
            let request = new sql.Request();
            request.query('select * from note_table', function (err, recordset) {
                if (err) {
                    console.log(err);
                    res.json({ err: 'Cound not access notes' });
                } else {
                    // console.log(recordset);
                    res.json({ notes: recordset });
                }
            });
        };
    });
});

app.post('/notes', (req, res) => {
    const newNote = req.body.newNote;

    // add note to database
    // TODO
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}. URL open on http://localhost:${PORT}/`);
});