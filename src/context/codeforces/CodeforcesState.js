import { useState } from "react";
import CodeforcesContext from "./codeforcesContext";

const CodeforcesState = (props) => {

  const headerurl = 'https://codeforces.com/api';
  const [username,setUserName] = useState();
  const [userdetail,setUserDetail] = useState();


  const getUserData = async(usercf) => {
      setUserName(usercf);
      const url = headerurl + '/user.info?handles=' + usercf;
      const response = await fetch(url, {method: "GET"});
      const json = await response.json();
      setUserDetail(json);
  }

  return (
    <CodeforcesContext.Provider value={{ username , userdetail ,  getUserData }}>
        {props.children}
    </CodeforcesContext.Provider>
  )
}

export default CodeforcesState
