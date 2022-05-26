import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";
import themeContext from "../context/theme/themeContext";

const NoteItem = (props) => {

  const tcontext = useContext(themeContext);
  const { theme } = tcontext;

  const { note , updateNote } = props;
  const context = useContext(noteContext);
  const acontext = useContext(alertContext);
  const { changer } = acontext;
  const {deleteNote} = context;

  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ 
        backgroundColor:theme.color==="dark"?"#282828":"white" , 
        boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
        }} >
        <div className="card-body">
          <div className="d-flex align-items-center"  >
            <h5 className="card-title" style={{color:theme.color==="dark"?"white":"black"}}>{note.title}</h5>
            <i className="fa-solid fa-pen-to-square mx-2"  style={{ color:theme.color==="dark"?"white":"black" }} onClick = {()=>{updateNote(note)} }></i>
            <i className="fa-solid fa-trash-can mx-2" style={{ color:theme.color==="dark"?"white":"black" }} onClick={()=>{ 
              deleteNote(note._id); 
              changer("note has been deleted as requested" , "success");
            }}></i>
          </div>
            <span className="badge text-bg-info mx-2" > {note.tag} </span>
          <p className="card-text" style={{color:theme.color==="dark"?"white":"black"}} >{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
