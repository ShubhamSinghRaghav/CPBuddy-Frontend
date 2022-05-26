import React , {useContext, useState} from "react";
import {useNavigate} from 'react-router';
import alertContext from "../context/alert/alertContext";
import themeContext from "../context/theme/themeContext";

const Signup = () => {
  const acontext = useContext(alertContext);
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  const {changer} = acontext;
  const [credentials, setCredentials] = useState({ name : "", email : "", password : "" , cpassword : ""});

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    changer("sign up done","success");
    console.log(alert)

    const {name , email , password } = credentials;
    const response = await fetch(`https://cpbuddy.herokuapp.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });
    const json = await response.json();
    // console.log(alert)
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      changer("sign up done","success");
    } else {
      changer("User with given mail id already exists, try again","danger");
    }

  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{color:theme.color==="dark"?"white":"black"}}>
      <h2 className="mt-3">Signup to create notes in CPBuddy</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            aria-describedby="nameHelp" 
            style={{
              color:theme.color==="light"?"#282828":"white",
              backgroundColor:theme.color==="dark"?"#282828":"white" , 
              boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
              }}
          />
        </div>
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
            minLength={5} required 
            onChange={onChange} 
            style={{
              color:theme.color==="light"?"#282828":"white",
              backgroundColor:theme.color==="dark"?"#282828":"white" , 
              boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
              }}
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            minLength={5} required 
            onChange={onChange} 
            style={{
              color:theme.color==="light"?"#282828":"white",
              backgroundColor:theme.color==="dark"?"#282828":"white" , 
              boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
              }}
          />
        </div> */}
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
