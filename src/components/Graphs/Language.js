import React,{useContext} from 'react'
import ReactApexChart from "react-apexcharts";
import themeContext from "../../context/theme/themeContext";

const Language = (props) => {
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  const graph = {
          
    series: [{
      // data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      data: props.language.lang_count
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        foreColor:theme.color==="dark"?"white":"black",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        // categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
        //   'United States', 'China', 'Germany'
        // ],
        categories:  props.language.lang_type,
      }
    },
  
  
  };
  return (
    <>
    {/* {console.log(props.language)}  */}
      {props.language && 
        <div id="chart">
        <ReactApexChart
          options={graph.options}
          series={graph.series}
          type="bar"
          width={500}
        />
      </div>
      }
    </>
  )
}

export default Language
