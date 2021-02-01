import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../StockListPage/StockList.css';
import StatsCard from '../MainPage/StatsCard';
import AreaChart from './AreaChart.js';

export default function StockList() {
    const [Symbols, setSymbols] = useState([]);

    function getAllStockData() {
        axios
            .get(`http://localhost:8080/stock/getAllLastPrice`)
            .then((resp) => {
                console.log(resp.data);
                setSymbols(resp.data)
            }
            );
    }

    useEffect(() => {
        getAllStockData();
    }, [])

    if (Symbols.length === 0) {
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
            <div class="row">
            {Symbols.map((symbol) => {
                return( 
                    <React.Fragment>
                                        
                        <div class="col-xs-12 col-sm-6 col-md-4">  
                            <div class="card">
                                <div class="card-body text-center">
                                    <p><img class="img-fluid rounded-circle" src="https://w7.pngwing.com/pngs/664/673/png-transparent-apple-logo-iphone-computer-apple-logo-company-heart-logo-thumbnail.png" alt="card"></img></p>
                                    <h4 class="card-title">{symbol.stock.name}</h4>
                                    <p class="card-text">This is basic card with image on top, title, description and button.</p>
                                    <StatsCard 
                                        label={"Total value"}
                                        amount={`100`}
                                        icon={"las la-money-bill-wave float-left"} 
                                    />
                                    <StatsCard 
                                        label={"Total value"}
                                        amount={`-100`}
                                        icon={"las la-money-bill-wave float-left"} 
                                    />
                                    <AreaChart />
                                    <a href="http://localhost:3000/" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
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