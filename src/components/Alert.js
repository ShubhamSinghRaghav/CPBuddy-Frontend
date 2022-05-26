import React,{useContext} from "react";
import alertContext from "../context/alert/alertContext";

const Alert = () => {
  const acontext = useContext(alertContext);
  const {alert} = acontext;

  return (
    <div>
      {alert && <div className={`alert alert-${alert.type}`} role="alert">
        {alert.message}
      </div>}
    </div>
  );
};

export default Alert;
