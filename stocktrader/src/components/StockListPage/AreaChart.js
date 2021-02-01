import React,{useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import useInterval from 'react-useinterval';
import axios from 'axios';

export default function AreaChart(props) {
    const [Series, setSeries] = useState([]);
    const [Dates, setDates] = useState([]);

    function GetData(){
      setDates([1, 2, 3]);
      setSeries([1,3,2]);
    }

    useEffect(() => {
      GetData();
    }, [props.symbol])

    useInterval(() => {
      GetData();
      console.log('UPDATING 10 SECS')
    }, 10000);

    const series = [{
        name: "Value",
        data: Series
    }];

    const options = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          labels: Dates, 
          xaxis: {
            labels: {
              show: false
            }
          },
          yaxis: {
            type: 'disable',
            show: false,
            showAlways: false,
          },
          legend: {
            horizontalAlign: 'left'
          },
      };
  



    return (
        <div className="border">
            <ReactApexChart options={options} series={series} type="area" height={350} /> 
        </div>
    )
}
