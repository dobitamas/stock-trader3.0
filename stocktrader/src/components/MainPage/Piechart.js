import React,{useState, useEffect} from 'react';
import Chart from "react-apexcharts";
import './Piechart.css';


export default function PieChart(props) {
    const [State, setState] = useState(
        {
        series: props.series,
        options: {
        chart: {
            width: '50%',
            type: 'donut',
        },
        labels: ['Stock', 'Cash'],
        dataLabels: {
            enabled: true,
            color: "white",
        },
        responsive: [{
            breakpoint: '50%',
            options: {
            chart: {
                width: '50%'
            },
            legend: {
                show: false
            }
            }
        }],
        legend: {
            position: 'right',
            offsetY: 50,
            height: 230,
            
        }
    }}
    ); 
  

 return ( 
  <div>
    <div className="chart-wrap">
      <div id="chart" className="container">
        <Chart options={State? State.options : {}} series={State? State.series : []} type="donut" width={"95%"} />
      </div>
    </div>
  </div>
 )
}
