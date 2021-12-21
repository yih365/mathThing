const express = require('express');

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

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}. URL open on http://localhost:${PORT}/`);
});