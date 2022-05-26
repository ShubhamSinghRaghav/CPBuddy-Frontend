import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [];
  
  // const notesInitial = [
  //     {
  //       "_id": "62864e0dfcb0e280aba359a8",
  //       "user": "628570123d69c036464719af",
  //       "title": "First title has been updated",
  //       "description": "finally something to the pack but updated one ",
  //       "tag": "danger",
  //       "date": "2022-05-19T14:02:53.122Z",
  //       "__v": 0
  //     },
  //     {
  //       "_id": "6286a63e7b53b4ac03a4f7b2",
  //       "user": "628570123d69c036464719af",
  //       "title": "First title 3",
  //       "description": "finally something to the pack 3",
  //       "tag": "presonal3",
  //       "date": "2022-05-19T20:19:10.332Z",
  //       "__v": 0
  //     }
  //   ]

  const host = "http://localhost:5000";
  const [notes, setNotes] = useState(notesInitial);

  //Get all Node
  const getNotes = async () => {
    // API call /api/notes/fetchallnotes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    //concat: adds the note and return the array[]
    //push: adds the note but doesn't return the array[]
    //API : api/notes/addnote

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);
    setNotes(notes.concat(json));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    // API call /api/notes/fetchallnotes
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    const json = await response.json();
    console.log(json);

    // console.log('noteitem deleted with id = '+id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //cant directly alter notes
    // creation of copy
    let newNotes = JSON.parse(JSON.stringify(notes));

    //Logic to edit client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  // {console.log("hool")}

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
