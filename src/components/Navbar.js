import React , { useContext} from "react";
import { Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import themeContext from "../context/theme/themeContext";

const Navbar = ()=> {

  const tcontext = useContext(themeContext);
  const { theme } = tcontext;

  let navigate = useNavigate();
  let location = useLocation();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${theme.color} bg-${theme.color}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          <i className="fa-solid fa-laptop-code "></i> CPBuddy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  <i className="fa-solid fa-note-sticky mx-1"></i>Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/display" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/display"
                >
                  <i className="fa-solid fa-address-card mx-1"></i> Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/stalk" ? "active" : ""
                  }`}
                  to="/stalk"
                >
                  <i className="fa-solid fa-user-ninja"></i>Stalk
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/documentation" ? "active" : ""
                  }`}
                  to="/documentation"
                >
                  <i className="fa-solid fa-file-code mx-1"></i>Documentation
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
              <i className="fa-solid fa-right-to-bracket mx-1"></i> Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
              <i className="fa-solid fa-user-plus mx-1"></i> Signup
              </Link>
            </form> : <button className="btn btn-primary mx-1" onClick={handleLogout}>
               Logout <i className="fa-solid fa-right-from-bracket mx-1"></i> 
              </button>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
