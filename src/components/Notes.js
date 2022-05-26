import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";
import themeContext from "../context/theme/themeContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router';

const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const acontext = useContext(alertContext);
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  const { changer } = acontext;
  const { notes, getNotes, editNote } = context;
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate('/login');
      changer("Login is required before accessing notes","danger");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id , etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag});
  };

  const handleClick = (e) => {
    e.preventDefault();
    // console.log("Updation of Node");
    editNote(note.id,note.etitle,note.edescription,note.etag);
    changer("note has been updated as requested" , "success");
    ref.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
    {/* {console.log(context)} */}
      <AddNote />

      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" 
        style={{color:theme.color==="dark"?"white":"black"}} 
        >
          <div className="modal-content"  
          style={{backgroundColor:theme.color==="dark"?"#181818":"white" }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"  >
                Updation of Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" 
            // style={{color:theme.color==="dark"?"white":"black"}} 
            >
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  onChange={onChange} 
                  value={note.etitle} 
                  minLength={5} 
                  required 
                  aria-describedby="emailHelp" 
                  style={{ 
                    color:theme.color==="light"?"#282828":"white",
                    backgroundColor:theme.color==="dark"?"#282828":"white" , 
                    boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
                    }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription" 
                  value={note.edescription} 
                  onChange={onChange} 
                  minLength={5} 
                  required 
                  style={{ 
                    color:theme.color==="light"?"#282828":"white",
                    backgroundColor:theme.color==="dark"?"#282828":"white" , 
                    boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
                    }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={note.etag} 
                  onChange={onChange} 
                  minLength={5} 
                  required 
                  style={{ 
                    color:theme.color==="light"?"#282828":"white",
                    backgroundColor:theme.color==="dark"?"#282828":"white" , 
                    boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
                    }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick} 
                ref={refClose}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2 style={{color:theme.color==="dark"?"white":"black"}} >Your Sticky Notes</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} updateNote={updateNote} />
        ))}
      </div>
    </>
  );
};

export default Notes;
