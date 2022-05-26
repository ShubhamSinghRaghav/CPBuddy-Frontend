import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    // const 
    const [alert,setAlert] = useState(null);

    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    const changer = (mess , typ) => {
        mess = capitalize(mess);
        setAlert({message:mess , type:typ});
        setTimeout(()=>{
            setAlert(null);
        },2500);
    }

    // console.log("hool2")
    return (
        <AlertContext.Provider value={{ alert , changer }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
