import React from "react";
import "./App.css";
import Axios from 'axios';
import { useHistory, Link } from "react-router-dom";

function Notes() {
  const history = useHistory();
  console.log(useHistory);

  const[newNote, setNewNote] = React.useState("");
  const[displayText, setDisplayText] = React.useState("");
  const[notes, setNotes] = React.useState([]);

  React.useEffect(() => {
      Axios.get('/grabNote').then((res) => {
          if (res.data.err) {
              console.log(res.data.err);
              setDisplayText("Sorry notes could not be accessed");
          } else {
            console.log(res.data.notes.recordset);
            if (res.data.notes) setNotes(res.data.notes.recordset);
          }
      });
  });


  const home = () => { history.push('/') };

  const addNote = () => {
    Axios.post('/notes', {
        newNote: newNote
    }).then((res) => {
        if (res.data.err) {
            console.log(res.json.err);
            setDisplayText("Sorry could not add note");
        } else {
            setDisplayText("Note added");
        };
    });
  };


  return (
    <div className="App">
      <header className="App-header">
        Notes
      </header>

      <div className="home">
              <button onClick={home}>Home Page</button>
      </div>

      <div className="addNote">
        <input type="text" onChange={(e) => {setNewNote(e.target.value)}} />
        <button onClick={addNote}>Add New Note</button>
        <br/>
        {displayText}
      </div>

      {notes.map((item, index) => {
          return (
              <div className='singleNote'>
              {item.note}
              </div>
          );
      })}
      
    </div>
  );
}

export default Notes;