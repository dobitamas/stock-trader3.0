import React from 'react';
import StocksTable from '../MainPage/StocksTable';
import Chart from './Chart';
import Offers from './Offers';
import Stockcard from './Stockcard';
import StockProfile from './StockProfile';
import StockPerformance from './StockPerformance';
import {useParams} from 'react-router-dom';

export default function Detailedstockpage(props){
    let {symbol} = useParams();
    
    return(
        <div>
                    <div class="card m-3 border border-primary container mx-auto">
                        <h3 style={{textAlign: "center"}}>Portfolio balance of {symbol}</h3>
                        <div className="row row-eq-height w-100 mx-auto">  
                                <div className="col ml-5 mr-4 card border border-info">
                                    <StockProfile symbol={symbol} />
                                </div>
                                <div className="col mr-5 ml-4 card border border-info" style={{textAlign: "right"}}>                                   
                                    <StockPerformance symbol={symbol}/>                                  
                                </div>
                        </div>
                    </div>
            <div className="container-fluid">
                <div className="row" >
                    <div className="col mt-5">
                        <Chart symbol={symbol} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mt-5">
                        <Offers symbol={symbol}/>
                    </div>
                </div>
            </div>
        </div>
    )
}