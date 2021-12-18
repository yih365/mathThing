import React from "react";
import "./App.css";
import { useHistory, Link } from "react-router-dom";

function Rref() {
  const[rowNum, setRowNum] = React.useState(0);
  const[columnNum, setColumnNum] = React.useState(0);

  const history = useHistory();
  console.log(useHistory);

  const home = () => { history.push('/') };


  return (
    
    <div className="App">
      <header className="App-header">
        RREF Calculator
      </header>

      <div className="home">
              <button onClick={home}>Home Page</button>
      </div>

      <div className="enterMatrix">
        <h1>Matrix Size</h1>
        <label>Rows</label>
        <input type="text" onChange={(e) => {setRowNum(e.target.value);}} />
        <label>Columns</label>
        <input type="text" onChange={(e) => {setColumnNum(e.target.value);}} />
        <br/>

      </div>

    </div>
  );
}

export default Rref;