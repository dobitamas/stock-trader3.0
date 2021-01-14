import React,{useState} from 'react';
import NVD3Chart from 'react-nvd3';


export default function PieChart(props) {

  const datum = [
    {key: "Stock", y: props.series[0], color: "#264653"},
    {key: "Cash", y: props.series[1], color: "#2A9D8F"},
    
];

 return ( 
  <div className="card m-3 border border-info">
        <NVD3Chart id="chart" height={"575"} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
  </div>
 )
} 




 

