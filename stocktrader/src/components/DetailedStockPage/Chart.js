import React,{useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';


export default function Chart(props){

    const [StockDataApex, setStockDataApex] = useState([]);
    const [StockData1, setStockData1] = useState([]);
    const [StockData5, setStockData5] = useState([]);
    const [StockDataD, setStockDataD] = useState([]);

    const [VolumeDataApex, setVolumeDataApex] = useState([]);   
    const [VolumeData1, setVolumeData1] = useState([]);
    const [VolumeData5, setVolumeData5] = useState([]);
    const [VolumeDataD, setVolumeDataD] = useState([]);

    const [MinDateApex, setMinDateApex] = useState();
    const [MaxDateApex, setMaxDateApex] = useState();
    const [MinDate1, setMinDate1] = useState();
    const [MaxDate1, setMaxDate1] = useState();
    const [MinDate5, setMinDate5] = useState();
    const [MaxDate5, setMaxDate5] = useState();
    const [MinDateD, setMinDateD] = useState();
    const [MaxDateD, setMaxDateD] = useState();

    const series = [{
      data: StockDataApex
    }];

    const options = {
      chart: {
        type: 'candlestick',
        height: 350,
        id: 'candles',
        toolbar: {
          autoSelected: 'pan',
          show: true
        },
        zoom: {
          enabled: true
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#3C90EB',
            downward: '#DF7D46'
          }
        }
      },
      xaxis: {
        type: 'datetime'
      }
    };
  
    const seriesBar = [{
      name: 'volume',
      data: VolumeDataApex
    }];
    const optionsBar = {
      chart: {
        height: 160,
        type: 'bar',
        brush: {
          enabled: true,
          target: 'candles',
          autoScaleYaxis: false 
        },
        selection: {
          enabled: true,
          xaxis: {
            min: MinDateApex,
            max: MaxDateApex
          },
          fill: {
            color: '#ccc',
            opacity: 0.4
          },
          stroke: {
            color: '#0D47A1',
          }
        },
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          columnWidth: '80%',
          colors: {
            ranges: [{
              from: -1000,
              to: 0,
              color: '#F15B46'
            }, {
              from: 1,
              to: 1000,
              color: '#FEB019'
            }],
      
          },
        }
      },
      stroke: {
        width: 0
      },
      xaxis: {
        type: 'datetime',
        axisBorder: {
          offsetX: 0
        }
      },
      yaxis: {
        labels: {
          show: false,
        }
      }
    };




    useEffect(() => {
        const axios = require('axios');
        axios.get(`http://localhost:8080/stock/getcandle/${props.symbol}/5`)
          .then((resp) => {
            setStockData1(resp.data.reactCandle1.reactCandleDataList)
            // resp.data.reactVolumeDataList.map((vol) => (
            //   setVolumeData((oldVolumeData) => [...oldVolumeData, [vol.x, vol.volume]])
            // ))
            setVolumeData1(resp.data.reactCandle1.reactVolumeDataList)
            setMinDate1(resp.data.reactCandle1.reactCandleDataList[0].x)
            setMaxDate1(resp.data.reactCandle1.reactCandleDataList[(resp.data.reactCandle1.reactCandleDataList.length)-1].x)
            console.log(resp.data)

            setMinDateApex(resp.data.reactCandle1.reactVolumeDataList[0][1])
            setMaxDateApex(resp.data.reactCandle1.reactVolumeDataList[(resp.data.reactCandle1.reactVolumeDataList.length)-1][1])
            setStockDataApex(resp.data.reactCandle1.reactCandleDataList)
            setVolumeDataApex(resp.data.reactCandle1.reactVolumeDataList)

          })
    }, [props.symbol])

    if (StockDataApex.length < 1) {
      return "Loading";
    } else {
    return(
      
      <div class="chart-box" style={{boxShadow: "0px 8px 60px -10px rgba(13, 28, 39, 0.6)"}}>
        <ul class="pagination">
          <li className="page-item"><a className="page-link" href="#">1 MIN</a></li>
          <li className="page-item"><a className="page-link" href="#">5 MIN</a></li>
          <li className="page-item"><a className="page-link" href="#">DAY</a></li>
        </ul>
        <div id="chart-candlestick">
            <ReactApexChart options={options} series={series} type="candlestick" height={700} width={"100%"} />
        </div>
        <div id="chart-bar">
          <ReactApexChart options={optionsBar} series={seriesBar} type="bar" height={260} />
        </div>
      </div>
    );

}
}
