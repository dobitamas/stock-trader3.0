import React,{useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';


export default function Chart(props){
    const [SelectedInterval, setSelectedInterval] = useState(1);
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
          show: true,
        }
      }
    };

    function ChangeInterval(interval){
      if(interval === 1){
        setMinDateApex(MinDate1);
        setMaxDateApex(MaxDate1);
        setStockDataApex(StockData1);
        setVolumeDataApex(VolumeData1);
        setSelectedInterval(1);
      } else if(interval === 5) {
        setMinDateApex(MinDate5);
        setMaxDateApex(MaxDate5);
        setStockDataApex(StockData5);
        setVolumeDataApex(VolumeData5);
        setSelectedInterval(5);
      } else{
        setMinDateApex(MinDateD);
        setMaxDateApex(MaxDateD);
        setStockDataApex(StockDataD);
        setVolumeDataApex(VolumeDataD);
        setSelectedInterval(24);
      }
    }


    useEffect(() => {
        //const axios = require('axios');
        axios.get(`http://localhost:8080/stock/getcandle/${props.symbol}`)
          .then((resp) => {
            setStockData1(resp.data.reactCandle1.reactCandleDataList)
            setVolumeData1(resp.data.reactCandle1.reactVolumeDataList)
            setMinDate1(resp.data.reactCandle1.reactCandleDataList[0].x)
            setMaxDate1(resp.data.reactCandle1.reactCandleDataList[(resp.data.reactCandle1.reactCandleDataList.length)-1].x)
            
            setStockData5(resp.data.reactCandle5.reactCandleDataList)
            setVolumeData5(resp.data.reactCandle5.reactVolumeDataList)
            setMinDate5(resp.data.reactCandle5.reactCandleDataList[0].x)
            setMaxDate5(resp.data.reactCandle5.reactCandleDataList[(resp.data.reactCandle5.reactCandleDataList.length)-1].x)

            setStockDataD(resp.data.reactCandleD.reactCandleDataList)
            setVolumeDataD(resp.data.reactCandleD.reactVolumeDataList)
            setMinDateD(resp.data.reactCandleD.reactCandleDataList[0].x)
            setMaxDateD(resp.data.reactCandleD.reactCandleDataList[(resp.data.reactCandleD.reactCandleDataList.length)-1].x)


            setMinDateApex(resp.data.reactCandle1.reactCandleDataList[0].x)
            setMaxDateApex(resp.data.reactCandle1.reactCandleDataList[(resp.data.reactCandle1.reactCandleDataList.length)-1].x)
            
            setStockDataApex(resp.data.reactCandle1.reactCandleDataList)
            setVolumeDataApex(resp.data.reactCandle1.reactVolumeDataList)
            console.log(resp.data)

          })

          setInterval(() => {
            axios
                .get(`http://localhost:8080/stock/getcandle/${props.symbol}/1`)
                .then((resp) => {
                  setStockData1(resp.data.reactCandle1.reactCandleDataList)
                  setVolumeData1(resp.data.reactCandle1.reactVolumeDataList)
                  setMinDate1(resp.data.reactCandle1.reactCandleDataList[0].x)
                  setMaxDate1(resp.data.reactCandle1.reactCandleDataList[(resp.data.reactCandle1.reactCandleDataList.length)-1].x)
                  console.log("updating 1 minute!!!")
                })
        }, 10000)

        setInterval(() => {
          axios
              .get(`http://localhost:8080/stock/getcandle/${props.symbol}/5`)
              .then((resp) => {
                setStockData5(resp.data.reactCandle5.reactCandleDataList)
                setVolumeData5(resp.data.reactCandle5.reactVolumeDataList)
                setMinDate5(resp.data.reactCandle5.reactCandleDataList[0].x)
                setMaxDate5(resp.data.reactCandle5.reactCandleDataList[(resp.data.reactCandle5.reactCandleDataList.length)-1].x)
                console.log("updating 5 minute!!!")
              })
      }, 15000)

        
    }, [props.symbol])


    
    if (VolumeDataApex.length < 1 && StockDataApex < 1) {
      return (
          <div>
              <img
                className = "mx-auto d-block"
                id="loading"
                src="/candle_loader.gif"
                alt="loading candle chart"
                width="70%"
                height="auto"
              />
          </div>
      );
    } else {
    return(
      
      <div className="chart-box" style={{boxShadow: "0px 8px 60px -10px rgba(13, 28, 39, 0.6)"}}>
        <h3 className="ml-3">Selected: {SelectedInterval}</h3>
        <ul className="pagination ml-3 mt-3">
          <li className="page-item"><button className="page-link" onClick={_ =>ChangeInterval(1)}>1 MIN</button></li>
          <li className="page-item"><button className="page-link" onClick={_ =>ChangeInterval(5)}>5 MIN</button></li>
          <li className="page-item"><button className="page-link" onClick={_ =>ChangeInterval("D")}>DAY</button></li>
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
