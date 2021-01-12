import React,{useEffect, useState, useContext} from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from "dayjs";


export default function Chart(props){
    const [SelectedStock, setSelectedStock] = useState(props.symbol);
    const [StockData, setStockData] = useState([]);
    const [VolumeData, setVolumeData] = useState([]);
    const [MinDate, setMinDate] = useState();
    const [MaxDate, setMaxDate] = useState();


    
    // const series = [{
    //     name: 'candle',
    //     data: StockData? StockData : 0
    //   }];

    //   const options = {
    //     chart: {
    //       height: 350,
    //       type: 'candlestick',
    //     },
    //     title: {
    //       text: `Candle chart of: ${SelectedStock}`,
    //       align: 'center'
    //     },
    //     annotations: {
    //       xaxis: [
    //         {
    //           x: 'Oct 06 14:00',
    //           borderColor: '#00E396',
    //           label: { 
    //             borderColor: '#00E396',
    //             style: {
    //               fontSize: '12px',
    //               color: '#fff',
    //               background: '#00E396'
    //             },
    //             orientation: 'horizontal',
    //             offsetY: 7,
    //             text: 'Annotation Test'
    //           }
    //         }
    //       ]
    //     },
    //     tooltip: {
    //       enabled: true,
    //     },
    //     xaxis: {
    //       type: 'category',
    //       labels: {
    //         formatter: function(val) {
    //           return dayjs(val).format('MMM DD HH:mm')
    //         }
    //       }
    //     },
    //     yaxis: {
    //       tooltip: {
    //         enabled: true
    //         }
    //     }

    
    const series = [{
      data: StockData
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
      data: VolumeData
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
            min: MinDate,
            max: MaxDate
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
            setStockData(resp.data.reactCandleDataList)
            resp.data.reactVolumeDataList.map((vol) => (
              setVolumeData((oldVolumeData) => [...oldVolumeData, [vol.x, vol.volume]])
            ))
            setMinDate(resp.data.reactVolumeDataList[0].x)
            setMaxDate(resp.data.reactVolumeDataList[(resp.data.reactVolumeDataList.length)-1][1])
            console.log(resp.data)
          })
    }, [])

    if (VolumeData.length < 1) {
      return "Loading";
    } else {
      console.log(VolumeData[0].volume)
    return(
      <div class="chart-box">
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
