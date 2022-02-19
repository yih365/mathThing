import React from "react";
import "./App.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Matrix() {
    const history = useHistory();
    
    const[rowNum, setRowNum] = React.useState(0);
    const[columnNum, setColumnNum] = React.useState(0);
    const[matrixArray, setMatrixArray] = React.useState([[]]);
    
    const[rowNum2, setRowNum2] = React.useState(0);
    const[columnNum2, setColumnNum2] = React.useState(0);
    const[matrixArray2, setMatrixArray2] = React.useState([[]]);
    
    const[resultArray, setResultArray] = React.useState([]);
    const[textOutput, setTextOutput] = React.useState([]);

    const home = () => { history.push('/') };

    const add = () => {
        if (rowNum != rowNum2 || columnNum != columnNum2) {
            setTextOutput("Matrix sizes to do match. Cannot add");
            return;
        }

        console.log(matrixArray);
        console.log(matrixArray2);

        Axios.post('/matrix', {
            matrixArray: matrixArray,
            matrixArray2: matrixArray2,
            operation: "add"
        }).then((res) => {
            if (res.data.err) console.log(res.data.err);
            if (res.data.array) {
              console.info(res.data.array);
              setResultArray(res.data.array);
              setTextOutput("");
            } else {
              setTextOutput("Sorry could not find answer");
            }
        });
    };

    const multiply = () => {
        if (columnNum != rowNum2) {
            setTextOutput("Make sure column number of first matrix matches \
            row number of second matrix");
            return;
        }

        console.log(matrixArray);
        console.log(matrixArray2);

        Axios.post('/matrix', {
            matrixArray: matrixArray,
            matrixArray2: matrixArray2,
            operation: "multiply"
        }).then((res) => {
            if (res.data.err) console.log(res.data.err);
            if (res.data.array) {
              console.info(res.data.array);
              setResultArray(res.data.array);
              setTextOutput("");
            } else {
              setTextOutput("Sorry could not find answer");
            }
        });
    };

    const submit = (num) => {
        var newArray = [];

        let rows = 0;
        let columns = 0;

        switch (num) {
            case 1:
                rows = rowNum;
                columns = columnNum;
                break;
            case 2:
                rows = rowNum2;
                columns = columnNum2;
                break;
        }

        for (let i = 0; i < rows; i++) {
          newArray.push([]);
          for (let j = 0; j < columns; j++) {
            newArray[i].push(0);
          }
        }

        switch (num) {
            case 1:
                setMatrixArray(newArray);
                break;
            case 2:
                setMatrixArray2(newArray);
                break;
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                Matrix Calculator
            </header>

            <div className="home">
              <button onClick={home}>Home Page</button>
            </div>


            <div className="enterMatrix">
                <h1>Matrix Size</h1>
                <label>Rows</label>
                <input type="number" min="1" onChange={(e) => {setRowNum(e.target.value);}} />
                <label>Columns</label>
                <input type="number" min="1" onChange={(e) => {setColumnNum(e.target.value);}} />
                <button onClick={() => {submit(1);}}>Submit</button>
                <br/>

                <div className="startMatrix">
                {matrixArray.map((item, index) => {
                return(
                    <div className="row">
                    {item instanceof Array && item.map((num, i) => {
                    return (
                        <input key={{num} + " " + {i}} type="number" onChange={(e) => {matrixArray[index][i] = e.target.value}} />
                    );
                    })}
                    </div>
                );
                })}
                </div>
            </div>

            <div className="enterMatrix">
                <h1>Matrix Size</h1>
                <label>Rows</label>
                <input type="number" min="1" onChange={(e) => {setRowNum2(e.target.value);}} />
                <label>Columns</label>
                <input type="number" min="1" onChange={(e) => {setColumnNum2(e.target.value);}} />
                <button onClick={() => {submit(2);}}>Submit</button>
                <br/>

                <div className="startMatrix">
                {matrixArray2.map((item, index) => {
                return(
                    <div className="row">
                    {item instanceof Array && item.map((num, i) => {
                    return (
                        <input key={{num} + " " + {i}} type="number" onChange={(e) => {matrixArray2[index][i] = e.target.value}} />
                    );
                    })}
                    </div>
                );
                })}
                </div>
            </div>
            
            <br/>
            <br/>

            <button onClick={add}>Add</button>
            <button onClick={multiply}>Multiply</button>
            <br/>

            <div className="result">
                <table class="resultTable">
                {resultArray.map((item, index) => {
                return(
                    <tr>
                    {item instanceof Array && item.map((num, i) => {
                        return (
                        <td key={{index} + " " + {i}}>{num}</td>
                        )
                    })}
                    </tr>
                )
                })}
                </table>

                <h2>{textOutput}</h2>
            </div>

        </div>
    );
}

export default Matrix;