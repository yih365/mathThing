const { request } = require('express');
const express = require('express');
const sql = require('mssql/msnodesqlv8');
const math = require('mathjs');
const config = {
    user: 'DESKTOP-8VPMVQN\\yiyih',
    server: 'DESKTOP-8VPMVQN\\SQLEXPRESS', 
    database: 'Math Notes',
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
};

var idNum = 1;


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.post('/matrix', (req, res) => {
    let matrixArray = req.body.matrixArray;
    let matrixArray2 = req.body.matrixArray2;
    let operation = req.body.operation;

    matrixArray = math.matrix(matrixArray);
    matrixArray2 = math.matrix(matrixArray2);

    let resultingMatrix;
    switch (operation) {
        case "add":
            resultingMatrix = math.add(matrixArray, matrixArray2);
            break;
        case "multiply":
            resultingMatrix = math.multiply(matrixArray, matrixArray2);
            break;
    };
    resultingMatrix = resultingMatrix.toArray();
    
    if (resultingMatrix == undefined || resultingMatrix == null)
        res.json({ err: "null or undefined" });
    res.json({ array: resultingMatrix });
});

app.post('/rref', (req, res) => {
    let matrixArray = req.body.matrixArray;

    for (let i = 0; i<matrixArray.length; i++) {
        for (let j = 0; j< matrixArray[i].length; j++) {
            matrixArray[i][j] = parseInt(matrixArray[i][j]);
        }
    }

    // rref algorithm
    let currColumn = 0;
    for (let i = 0; i < matrixArray.length; i ++) {
        matrixArray = sortRows(matrixArray);
        if (currColumn >= matrixArray[i].length) break;

        if (matrixArray[i][currColumn] != 0) {
            // change to 1
            matrixArray[i] = performSelf((1/matrixArray[i][currColumn]), matrixArray[i]);
            // make zeros under
            for (let j = i+1; j<matrixArray.length; j ++) {
                matrixArray[j] = performOperation(-1*matrixArray[j][currColumn], matrixArray[i], matrixArray[j]);
            }
            currColumn ++;
        } else {
            // 0 in position
            // must mean that other rows under also have 0 at this column

            // repeat process on this row
            i--;
            // next column
            currColumn ++;
        }
    }
    
    res.json({ array: matrixArray });
});

const sortRows = (matrixArray) => {
    while(true) {
        let ok = true;
        for (let i  = 0; i < matrixArray.length-1; i ++) {
            if (compareZeros(matrixArray[i], matrixArray[i+1]) == 2) {
                // swap them
                tempArray = matrixArray[i];
                matrixArray[i] = matrixArray[i+1];
                matrixArray[i+1] = tempArray;

                // note there was a swap
                ok = false;
            }
        }
        // if no swaps, end
        if (ok) break;
    }
    return matrixArray;
}

// returns 1 if vector 1 is top, 2 if 2 is top
// vector1 is originally at top. dont swap if it is still top
const compareZeros = (vector1, vector2) => {
    let vectorArray = [vector1, vector2];
    let zeros = [0, 0];
    for (let i = 0; i <= 1; i++) {
        let count = 0;
        for (let j = 0; j < vector1.length; j++) {
            if (vectorArray[i][j] == 0) count ++;
            else {
                break;
            }
        }
        zeros[i] = count;
    }
    if (zeros[0] <= zeros[1]) return 1;
    else return 2;
}

// const leastZeros = (array) => {
//     let minz = array[0].length;
//     let minArray = array[0];
//     for (let i = 0; i < array.length; i ++) {
//         let count = 0;
//         for (let j = 0; j < array[i].length; j++) {
//             if (array[i][j] == 0) count ++;
//             else break;
//         }
//     }

// }

// return x times A
const performSelf = (x, A) => {
    for (let i = 0; i < A.length; i ++) {
        A[i] *= x;
    }
    return A;
}

// adds x times A to B
const performOperation = (x, A, B) => {
    for (let i = 0; i < A.length; i ++) {
        B[i] += A[i]*x;
    }
    return B;
}

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
                    idNum = parseInt(recordset.recordset.length)+1;
                    res.json({ notes: recordset });
                }
            });
        };
    });
});

app.post('/notes', (req, res) => {
    const newNote = req.body.newNote;

    // add note to database
    sql.connect(config, function(err) {
        if (err) {
            res.json({ err: "Could not connect with database" });
        } else {
            let request = new sql.Request();
            request.query("insert into note_table (note, id) values ('"+String(newNote)+"', "+parseInt(idNum)+")")
            .then(result => { res.json({ result: result }); })
            .catch(err => { 
                console.log(err);
                res.json({ err: "Could not add note" });
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}. URL open on http://localhost:${PORT}/`);
});