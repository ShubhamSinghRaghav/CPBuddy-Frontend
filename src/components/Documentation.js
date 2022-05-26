import React , {useContext} from "react";
import themeContext from "../context/theme/themeContext";

function Documentation() {
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  return (
    <>
      <h2 className="text-center my-3" style={{color:theme.color==="dark"?"white":"black"}}>API Documentation</h2>
      <div className="container" style={{color:theme.color==="dark"?"white":"black"}}>
        <div className="card mt-5" style={{ 
        backgroundColor:theme.color==="dark"?"#282828":"white" , 
        boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
        }}>
          <div className="card-body text-center">
            <span className="badge bg-primary" style={{ fontSize: "1rem" }}>
              Authentication
            </span>
            <p className="my-2">
              <span className="badge text-bg-info mx-2"> POST </span>Creation of 
              New User <mark >http://localhost:5000/api/auth/createuser</mark>{" "}
            </p>
            <p className="my-2">
              <span className="badge text-bg-info mx-2"> POST </span>
              User Login using credentials 
              <mark>http://localhost:5000/api/auth/login</mark>{" "}
            </p>
            <p className="my-2">
              <span className="badge text-bg-info mx-2"> POST </span>
              Get User Detail
              <mark>http://localhost:5000/api/auth/getuser</mark>{" "}
            </p>
          </div>
        </div>
        <div className="card mt-5" style={{ 
        backgroundColor:theme.color==="dark"?"#282828":"white" , 
        boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
        }}>
          <div className="card-body text-center">
            <span className="badge bg-primary" style={{ fontSize: "1rem" }}>
              User Notes
            </span>
            <p className="my-2">
              <span className="badge text-bg-success mx-2"> GET </span>
              Get Specific User notes
              <mark>http://localhost:5000/api/notes/fetchallnotes</mark>{" "}
            </p>
            <p className="my-2">
              <span className="badge text-bg-info mx-2"> POST </span>
              Add notes
              <mark>http://localhost:5000/api/notes/addnote</mark>{" "}
            </p>
            <p className="my-2">
              <span className="badge text-bg-warning mx-2"> UPDATE </span>
              Update Specific note
              <mark>http://localhost:5000/api/notes/updatenote/:noteid</mark>{" "}
            </p>
            <p className="my-2">
              <span className="badge text-bg-danger mx-2"> DELETE </span>
              Delete Specific note
              <mark>http://localhost:5000/api/notes/deletenote/:noteid</mark>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Documentation;
