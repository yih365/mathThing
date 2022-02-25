import React from "react";
import "./App.css";
import { useHistory, Link } from "react-router-dom";

function Main() {
  const history = useHistory();
  console.log(useHistory);

  const rref = () => { history.push('/rref') };

  const notes = () => { history.push('/notes') };
  
  const matrix = () => { history.push('/matrix') };

  return (
    
    <div className="App">
      <header className="App-header">
        Calculators
      </header>

      <div className="rref">
              <button onClick={rref}>Single Matrix Calculations</button>
      </div>

      <div className="matrix">
              <button onClick={matrix}>Matrix Calculator</button>
      </div>

      <div className="notes">
              <button onClick={notes}>Notes</button>
      </div>

    </div>
  );
}

export default Main;