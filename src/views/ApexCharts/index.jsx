import React from 'react';
import ReactApexChart from 'react-apexcharts';

// type GraphData = {
//   x: string,
//   y: number,
// };

// type Series = {
//   name: string,
//   data: GraphData[],
// }[];

// type GraphProps = {
//   series: Series,
// };

const Graph = ({ series }) => {
  const state = {
    series: series,
    options: {
      chart: {
        height: 350,
        type:
          'area' ||
          'line' ||
          'bar' ||
          'histogram' ||
          'pie' ||
          'donut' ||
          'radialBar' ||
          'scatter' ||
          'bubble' ||
          'heatmap' ||
          'treemap' ||
          'boxPlot' ||
          'candlestick' ||
          'radar' ||
          'polarArea' ||
          'rangeBar',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM'yy",
            day: 'MM/dd',
            hour: 'HH:mm',
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    },
  };

  //record内のdateに登録する値(number)
  let date = new Date('2021/08/26').getTime();

  return (
    <div id="chart">
      <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
    </div>
  );
};

export default Graph;
