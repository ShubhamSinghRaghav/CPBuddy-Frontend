import React, { useContext } from "react";
import themeContext from "../context/theme/themeContext";

const Mode = () => {
  const tcontext = useContext(themeContext);
  const { theme, themeChanger } = tcontext;

  const onhandleClick = () => {
    console.log(theme);
    themeChanger();
    document.body.style.backgroundColor =
      theme.color === "light" ? "#181818" : "white";
  };

  return (
    <>
      <div
        style={{
          bottom: "30px",
          right: "30px",
          borderRadius: "49px",
          padding: "18px",
          boxShadow: `0px 0px 4px ${theme.color==="dark"?"white":"black"}`,
          display: "inline",
          position: "fixed",
        }}
      >
        {theme.color === "dark" && (
          <i
            className="fa-solid fa-sun fa-2x"
            onClick={onhandleClick}
            style={{color:"white"}}
          ></i>
        )}
        {theme.color === "light" && (
          <i className="fa-solid fa-moon fa-2x" style={{color:"black"}} onClick={onhandleClick}></i>
        )}
      </div>
    </>
  );
};

export default Mode;
