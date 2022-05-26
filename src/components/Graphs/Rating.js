import React, {  useState, useEffect,useContext } from "react";
import ReactApexChart from "react-apexcharts";
import themeContext from "../../context/theme/themeContext";
// import codeforcesContext from "../../context/codeforces/codeforcesContext";

const Rating = (props) => {
  // const cfcontext = useContext(codeforcesContext);
  // const { contestcomplete } = cfcontext;
  // user contest rating extraction
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  const [contestcomplete , setContestcomplete] = useState({contestid : [] , urating : [] , rank : [] , timed : []});
  const [y, setY] = useState([]);
  const [x, setX] = useState([]);

  useEffect(() => {
    fetch("https://codeforces.com/api/user.rating?handle=" + props.username)
      .then((response) => response.json())
      .then((userrating) => {
        let contestid = [];
        let urating = [];
        let rank = [];
        let timed = [];

        for (let ind in userrating.result) {
          for (let obj in userrating.result[ind]) {
            if (obj === "contestId") {
              contestid = [...contestid, userrating.result[ind][obj]];
            } else if (obj === "newRating") {
              urating = [...urating, userrating.result[ind][obj]];
            } else if (obj === "rank") {
              rank = [...rank, userrating.result[ind][obj]];
            } else if (obj === "ratingUpdateTimeSeconds") {
              let date_str = new Date(
                userrating.result[ind][obj] * 1000
              ).toString();
              timed = [
                ...timed,
                date_str.slice(4, 7) + " " + date_str.slice(11, 15),
              ];
            }
          }
        }

        setContestcomplete({
          contestid: contestid,
          urating: urating,
          rank: rank,
          timed: timed,
        });
      });
  }, [props.username]);

  const onhandleClick = (e) => {
    setX([]);
    setY([]);
    for (let ind in contestcomplete.timed) {
      let yr = contestcomplete.timed[ind].slice(4, 8);
      if (yr === e.target.value) {
        setX((x) => [...x, contestcomplete.timed[ind]]);
        setY((y) => [...y, contestcomplete.urating[ind]]);
      }
    }
  };

  useEffect(() => {
    setX([]);
    setY([]);
    for (let ind in contestcomplete.timed) {
      let yr = contestcomplete.timed[ind].slice(4, 8);
      if (yr === "2018") {
        setX((x) => [...x, contestcomplete.timed[ind]]);
        setY((y) => [...y, contestcomplete.urating[ind]]);
      }
    }
    // eslint-disable-next-line
  }, [contestcomplete]);

  const buttons = [];
  const years = ["2018", "2019", "2020", "2021", "2022"];
  years.forEach((year) => {
    buttons.push(
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={onhandleClick}
        value={year}
        key={year}
      >
        {year}
      </button>
    );
  });

  const graph1 = {
    series: [
      {
        name: "Rating",
        data: y,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        foreColor:theme.color==="dark"?"white":"black",
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Codeforces Rating",
        align: "center",
      },
      grid: {
        row: {
          colors: ["#f3f3f3" ,"transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: x,
      },
    },
  };

  return (
    <>
      {contestcomplete && (
        <div id="chart">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            {buttons}
          </div>
          <ReactApexChart
            options={graph1.options}
            series={graph1.series}
            type="line"
            height={350}
          />
        </div>
      )}
    </>
  );
};

export default Rating;
