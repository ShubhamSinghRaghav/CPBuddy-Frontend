import React , {useContext, useState} from "react";
import {useNavigate} from 'react-router';
import alertContext from "../context/alert/alertContext";
import themeContext from "../context/theme/themeContext";

const Login = () => {
  const acontext = useContext(alertContext);
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  const {changer} = acontext;
  const [credentials , setCredentials] = useState({email:"",password:""});

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4NTcwMTIzZDY5YzAzNjQ2NDcxOWFmIn0sImlhdCI6MTY1Mjk2MDgwM30.uTNuwYwJrCKIqE1ehfP1PEV5GB2hX-Lv0JBhozlmYRg",
      },
      body: JSON.stringify({ email : credentials.email , password : credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        changer("logged in successfully" , "success");
    }else{
        changer("invalid credentials , please try again" , "danger");
    }
  };
  
  const onChange = (e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div
      className="container" style={{color:theme.color==="dark"?"white":"black"}}>
        <h2 className="mt-3">Log in to continue in CPBuddy</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" 
            value={credentials.email} 
            onChange={onChange}
            aria-describedby="emailHelp" 
            style={{
              color:theme.color==="light"?"#282828":"white",
              backgroundColor:theme.color==="dark"?"#282828":"white" , 
              boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
              }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password" 
            value={credentials.password} 
            onChange={onChange} 
            style={{
              color:theme.color==="light"?"#282828":"white",
              backgroundColor:theme.color==="dark"?"#282828":"white" , 
              boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
              }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
