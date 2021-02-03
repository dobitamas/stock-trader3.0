import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../StockListPage/StockList.css';
import StatsCard from '../MainPage/StatsCard';
import AreaChart from './AreaChart.js';
import { Link } from 'react-router-dom';

export default function StockList() {
    const [AllStockData, setAllStockData] = useState([]);

    function getAllStockData() {
        axios
            .get(`http://localhost:8080/stock/getStockListData`)
            .then((resp) => {
                console.log(resp.data);
                setAllStockData(resp.data)
            }
            );
    }

    useEffect(() => {
        getAllStockData();
    }, [])

    if (AllStockData.length === 0) {
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
    return (
        <div className="container-fluid">
            <div className="row">
            {AllStockData.map((symbol) => {
                return( 
                    <React.Fragment>                     
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mx-auto row row-eq-height">  
                            <div class="card">
                                <div class="card-body text-center ">
                                    <Link to={`/stockpage/${symbol.stock.symbol}`}>
                                        <p><img class="img-fluid rounded-circle" src={symbol.stock.logo} alt="card"></img></p>
                                    </Link>
                                    <h4 class="card-title">{symbol.stock.name}</h4>
                                    {/* <p class="card-text">This is basic card with image on top, title, description and button.</p> */}
                                    <StatsCard 
                                        label={"Current price"}
                                        amount={symbol.currentPrice}
                                        icon={"las la-money-bill-wave float-left"}
                                        prefix={"$ "}
                                    />
                                    <StatsCard 
                                        label={"Change"}
                                        amount={symbol.priceChange}
                                        icon={"las la-money-bill-wave float-left"}
                                        suffix={"%"}
                                    />
                                    <AreaChart series={symbol.historicalPrices} dates={symbol.dates}/>
                                    <a href={`http://localhost:3000/stockpage/${symbol.stock.symbol}`} class="btn btn-primary btn-sm"><i class="fa fa-line-chart">  DETAILS</i></a>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
            </div> 
        </div>
        
        
    )
    }
}