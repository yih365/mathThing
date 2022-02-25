import React from "react";
import "./App.css";
import Axios from 'axios';
import { useHistory, Link } from "react-router-dom";

function Rref() {
  const history = useHistory();
  console.log(useHistory);

  const[rowNum, setRowNum] = React.useState(0);
  const[columnNum, setColumnNum] = React.useState(0);

  const[matrixArray, setMatrixArray] = React.useState([[]]);
  const[resultArray, setResultArray] = React.useState([]);

  const[textOutput, setTextOutput] = React.useState([]);


  const home = () => { history.push('/') };

  const submit = () => {
    var newArray = [];
    for (let i = 0; i < rowNum; i++) {
      newArray.push([]);
      for (let j = 0; j < columnNum; j++) {
        newArray[i].push(0);
      }
    }
    setMatrixArray(newArray);
  };

  const findRREF = () => {
    console.log("front-end client");
    console.info(matrixArray);
    Axios.post('/rref', {
      matrixArray: matrixArray
    }).then((res) => {
      if (res.data.err) console.log(res.data.err);
      if (res.data.array) {
        console.info(res.data.array);
        setResultArray(res.data.array);
        setTextOutput("");
      } else {
        setTextOutput("Sorry could not find RREF");
      }
    });
  };

  const findDet = () => {
    if (rowNum !== columnNum) {
      setTextOutput("Matrix must be square size");
      return;
    }

    Axios.post('/det', {
      matrixArray: matrixArray
    }).then((res) => {
      if (res.data.err) console.log(res.data.err);
      if (res.data.array) {
        console.info(res.data.array);
        setResultArray(res.data.array);
        setTextOutput("");
      } else {
        setTextOutput("Sorry could not find determinant");
      }
    });
  };


  return (
    <div className="App">
      <header className="App-header">
        Single Matrix Calculations
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
        <button onClick={submit}>Submit</button>
        <br/>

        <div className="startMatrix">
        {matrixArray.map((item, index) => {
          return(
            <div className="row">
            {item instanceof Array && item.map((num, i) => {
              return (
                <input type="number" onChange={(e) => {matrixArray[index][i] = e.target.value}} />
              );
            })}
            </div>
          );
        })}
        </div>
      </div>

      <button onClick={findRREF}>Find RREF</button>
      <button onClick={findDet}>Find determinant</button>
      <br/>
      <br/>
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

export default Rref;