import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

type GraphData = {
  x: string;
  y: number;
};

type Series = {
  name: string;
  data: GraphData[];
}[];

type GraphProps = {
  series: Series;
};

const Graph: React.FC<GraphProps> = ({ series }) => {
  const state = {
    series: series,
    options: {
      chart: {
        height: 350,
        type: 'area',
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

  return (
    <div id="chart">
      <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
    </div>
  );
};

export default Graph;
