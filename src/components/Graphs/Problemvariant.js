import React , {useContext} from "react";
import ReactApexChart from "react-apexcharts";
import themeContext from "../../context/theme/themeContext";

const Problemvariant = (props) => {
  const tcontext = useContext(themeContext);
  const { theme } = tcontext;
  const graph1 = {
    series: props.tagcount,
    options: {
      chart: {
        height: 300,
        type: "radialBar",
        foreColor:theme.color==="dark"?"white":"black",
      },
      plotOptions: {
        radialBar: {
          offsetX: 200,
          offsetY: 10,
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 5,
            size: "0%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: props.tags,
      legend: {
        show: true,
        floating: true,
        fontSize: "25px",
        position: "left",
        offsetX: 50,
        offsetY: -10,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: true,
            },
          },
        },
      ],
    },
  };

  return (
    <>
      {props.tags && (
        <div id="chart">
          <ReactApexChart
            options={graph1.options}
            series={graph1.series}
            type="radialBar"
            height={600}
          />
        </div>
      )}
    </>
  );
};

export default Problemvariant;
