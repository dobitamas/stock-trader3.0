import React,{useEffect, useState, useContext} from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from "dayjs";


export default function Chart(props){
    const [SelectedStock, setSelectedStock] = useState("AAPL");
    const [StockData, setStockData] = useState([]);


    
    const series = [{
        name: 'candle',
        data: StockData? StockData : 0
      }];

      const options = {
        chart: {
          height: 350,
          type: 'candlestick',
        },
        title: {
          text: `Candle chart of: ${SelectedStock}`,
          align: 'center'
        },
        annotations: {
          xaxis: [
            {
              x: 'Oct 06 14:00',
              borderColor: '#00E396',
              label: { 
                borderColor: '#00E396',
                style: {
                  fontSize: '12px',
                  color: '#fff',
                  background: '#00E396'
                },
                orientation: 'horizontal',
                offsetY: 7,
                text: 'Annotation Test'
              }
            }
          ]
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          type: 'category',
          labels: {
            formatter: function(val) {
              return dayjs(val).format('MMM DD HH:mm')
            }
          }
        },
        yaxis: {
          tooltip: {
            enabled: true
            }
        }
    };
    
    

    useEffect(() => {
        const axios = require('axios');
        axios.get('http://localhost:8080/stock/getcandle/AAPL/5')
          .then(function(resp) {
            setStockData(resp.data.reactCandleDataList)
          })
    }, [])

    return(
        <div className="container">
            <ReactApexChart options={options} series={series} type="candlestick" height={350} />
        </div>
    )

}