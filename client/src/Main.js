import React from "react";
import "./App.css";
import { useHistory, Link } from "react-router-dom";

function Main() {
  const history = useHistory();
  console.log(useHistory);

  const rref = () => { history.push('/rref') };

  const notes = () => { history.push('/notes') };

  return (
    
    <div className="App">
      <header className="App-header">
        Calculators
      </header>

      <div className="rref">
              <button onClick={rref}>RREF Calculator</button>
      </div>

      <div className="notes">
              <button onClick={notes}>Notes</button>
      </div>

    </div>
  );
}

export default Main;