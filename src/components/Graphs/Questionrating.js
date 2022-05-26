import React,{useContext} from "react";
import ReactApexChart from "react-apexcharts";
import themeContext from "../../context/theme/themeContext";

const Questionrating = (props) => {
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  const graph = {
          
    series: [{
      name: 'Total Solved',
      data: props.qrating.question_rating
    }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        foreColor:theme.color==="dark"?"white":"black",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        // categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        categories: props.qrating.question_count
      },
      yaxis: {
        title: {
          text: 'Question Count'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      }
    },
  }; 

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={graph.options}
          series={graph.series}
          type="bar"
          height={400}
        />
      </div>
    </>
  );
};

export default Questionrating;
