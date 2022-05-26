import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";
import themeContext from "../context/theme/themeContext";

const AddNote = () => {
  const acontext = useContext(alertContext);
  const context = useContext(noteContext);
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  const { addNote } = context;
  const { changer } = acontext;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"",tag:""});
    changer("New Note Added" , "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2 style={{color:theme.color==="dark"?"white":"black"}} >Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" style={{color:theme.color==="dark"?"white":"black"}} >
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange} 
            value={note.title}  
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
          <label htmlFor="description" className="form-label" style={{color:theme.color==="dark"?"white":"black"}} >
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange} 
            value = {note.description} 
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
          <label htmlFor="tag" className="form-label" style={{color:theme.color==="dark"?"white":"black"}} >
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange} 
            value={note.tag} 
            minLength={5} 
            required 
            style={{ 
              color:theme.color==="light"?"#282828":"white",
              backgroundColor:theme.color==="dark"?"#282828":"white" , 
              boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
              }}
          />
        </div>
        <button disabled={note.title<5 || note.description<5 || note.tag<3} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
