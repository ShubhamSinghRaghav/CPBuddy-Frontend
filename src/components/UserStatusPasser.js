import React, { useEffect, useState , useContext } from "react";
import Problemvariant from "./Graphs/Problemvariant";
import Questionrating from "./Graphs/Questionrating";
import Accuracy from "./Graphs/Accuracy";
import Language from "./Graphs/Language";
import themeContext from "../context/theme/themeContext";

const UserStatusPasser = (props) => {

  const tcontext = useContext(themeContext);
  const { theme } = tcontext;

  const [tags, setTags] = useState([]);
  const [tagcount, setTagCount] = useState([]);
  const [acc, setAcc] = useState({});
  const [language,setLanguage] = useState({});
  const [qrating, setQrating] = useState({
    question_rating: [],
    question_count: [],
  });

  useEffect(() => {
    fetch("https://codeforces.com/api/user.status?handle=" + props.username)
      .then((response) => response.json())
      .then((obj) => {
        let wholesome = {};
        let qrate = {};
        let wholer = {};
        let lang = {};

        for (let ind in obj.result) {

          let str1 = obj.result[ind].programmingLanguage;
          if (!lang[str1]) {
            lang[str1] = 0;
          }
          lang[str1] = lang[str1] + 1;

          let str2 = obj.result[ind].verdict;
          // console.log(str2);
          if (!wholer[str2]) {
            wholer[str2] = 0;
          }
          wholer[str2] = wholer[str2] + 1;

          if (obj.result[ind].verdict === "OK") {
            if ("rating" in obj.result[ind]["problem"]) {
              let rr = obj.result[ind]["problem"]["rating"];
              if (!qrate[rr]) {
                qrate[rr] = 0;
              }
              qrate[rr] = qrate[rr] + 1;
            }
            for (let val in obj.result[ind].problem.tags) {
              let str = obj.result[ind].problem.tags[val];
              if (!wholesome[str]) {
                wholesome[str] = 0;
              }
              wholesome[str] = wholesome[str] + 1;
            }
          }
        }

        let lang_type = [] , lang_count = [];
        for(let ind in lang){
          lang_type = [...lang_type , ind];
          lang_count = [...lang_count , lang[ind]];
        }

        setLanguage({
          lang_type , lang_count
        });

        // console.log(wholer);
        // setAccuracy(wholer);

        let acc_type = [] , acc_count = [];
        for(let ind in wholer){
          acc_type = [...acc_type , ind];
          acc_count = [...acc_count , wholer[ind]];
        }

        setAcc({
          acc_type , acc_count
        })

        let ttags = [],
          ttagCount = [];

        for (let ind in wholesome) {
          ttags = [...ttags, ind];
          ttagCount = [...ttagCount, wholesome[ind]];
        }
        setTags(ttags);
        setTagCount(ttagCount);

        let question_rating = [],
          question_count = [];
        for (let ind in qrate) {
          question_rating = [...question_rating, qrate[ind]];
          question_count = [...question_count, ind];
        }
        setQrating({ question_rating, question_count });
      });
  }, [props.username]);

  return (
    <>
      <div className="card mt-5" style={{ 
        backgroundColor:theme.color==="dark"?"#282828":"white" , 
        boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
        }}>
        <div className="card-body text-center">
          <h3 className="text-center">{props.username} Problem Tags Graph</h3>
          {props.username && (
            <Problemvariant
              username={props.username}
              tags={tags}
              tagcount={tagcount}
            />
          )}
        </div>
      </div>
      <div className="card mt-5" style={{ 
        backgroundColor:theme.color==="dark"?"#282828":"white" , 
        boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
        }}>
        <div className="card-body text-center">
          <h3 className="text-center">{props.username} Question Rating Graph</h3>
          {props.username && (
            <Questionrating username={props.username} qrating={qrating} />
          )}
        </div>
      </div>
      <div className="card mt-5" style={{ 
        backgroundColor:theme.color==="dark"?"#282828":"white" , 
        boxShadow: `0px 0px 2px ${theme.color==="dark"?"white":"black"}`
        }}>
        <div className="row">
          <div className="col">
          <h3 className="text-center"> Languages Used </h3>
            {props.username && <Language username={props.username} language={language} />}
          </div>
           
          <div className="col">
          <h3 className="text-center"> Accuracy of {props.username} </h3>
            {props.username && (
              <Accuracy username={props.username} acc={acc} />
            )}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default UserStatusPasser;
