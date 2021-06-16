import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class Graph extends Component<{}, { series: any[]; options: any }> {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'React',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'みーたん',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
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
          categories: [
            '2021-06-10T00:00:00.000Z',
            '2021-06-11T01:30:00.000Z',
            '2021-06-12T02:30:00.000Z',
            '2021-06-13T03:30:00.000Z',
            '2021-06-14T04:30:00.000Z',
            '2021-06-15T05:30:00.000Z',
            '2021-06-16T06:30:00.000Z',
          ],
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
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
      </div>
    );
  }
}

export default Graph;
