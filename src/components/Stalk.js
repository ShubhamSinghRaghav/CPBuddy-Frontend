import React,{useContext} from 'react'
import themeContext from "../context/theme/themeContext";

const Stalk = () => {
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  return (
    <>
    <div className="container my-5"  style={{color:theme.color==="dark"?"white":"black"}}>
      <h2>
        Under development ...
      </h2>
    </div>
    </>
  )
}

export default Stalk
