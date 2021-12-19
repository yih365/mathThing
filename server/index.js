const express = require('express');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.post('/rref', (req, res) => {
    let matrixArray = req.body.matrixArray;

    console.info(matrixArray);

    res.json({ err: "not done yet" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}. URL open on http://localhost:${PORT}/`);
});