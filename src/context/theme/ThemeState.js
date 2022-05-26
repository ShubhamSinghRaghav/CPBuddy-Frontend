import { useState } from "react";
import ThemeContext from "./themeContext";

const ThemeState = (props) => {

  const [theme , setTheme] = useState({color:'light'});

  const themeChanger = ()=>{
      if(theme.color==='dark') setTheme({color:'light'});
      else setTheme({color:'dark'});
  }

  return (
    <ThemeContext.Provider value={{ theme , themeChanger}}>
         {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeState;
