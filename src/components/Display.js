import React, { useContext, useState } from "react";
import themeContext from "../context/theme/themeContext";
import alertContext from "../context/alert/alertContext";
import Rating from "./Graphs/Rating";
import UserStatusPasser from "./UserStatusPasser";

const Display = () => {
  const [val, setVal] = useState("");
  const [user, setUser] = useState("");

  const tcontext = useContext(themeContext);
  const { theme } = tcontext;

  const acontext = useContext(alertContext);
  const { changer } = acontext;

  const handleUserEnter = (e) => {
    e.preventDefault();
    setUser(val);
    changer("Welcome "+val+" to CP Buddy","success");
    // getUserData(val);
  };

  const onChangeSearchUser = (e) => {
    setVal(e.target.value);
  };

  return (
    <div className="container mt-5" style={{color:theme.color==="dark"?"white":"black"}}>
      <h2>
        Welcome to CP buddy
      </h2>
      <div className="card" style={{ 
        backgroundColor:theme.color==="dark"?"#202020":"white" , 
        boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
        }}>
        <div className="card-body text-center">
          Enter the Codeforces user name
          <form className="d-flex m-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={onChangeSearchUser} 
              style={{
                color:theme.color==="light"?"#282828":"white",
                backgroundColor:theme.color==="dark"?"#282828":"white" , 
                boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
                }}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={handleUserEnter}
            >
              Search
            </button>
          </form>
        </div>
      </div>
      
      {user && <div className="card mt-5" style={{ 
        backgroundColor:theme.color==="dark"?"#282828":"white" , 
        boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
        }}>
        <div className="card-body text-center">
          <h3>{user} Rating Graph</h3>
          <Rating username={user} />
        </div>
      </div>}
      {user && <UserStatusPasser username={user}/>}
    </div>
  );
};

export default Display;
