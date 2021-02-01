import React,{useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import useInterval from 'react-useinterval';
import axios from 'axios';

export default function AreaChart() {

    const series = [{
        name: "STOCK ABC",
        data: [1,3,2]
    }];

    const options = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          
          title: {
            text: 'Fundamental Analysis of Stocks',
            align: 'left'
          },
          subtitle: {
            text: 'Price Movements',
            align: 'left'
          },
          labels: ["label1", "label2", "label3"], 
          xaxis: {
            type: 'category',
          },
          yaxis: {
            opposite: true
          },
          legend: {
            horizontalAlign: 'left'
          }
      };
  



    return (
        <div>
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    )
}
