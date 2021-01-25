import React from 'react';
import StocksTable from '../MainPage/StocksTable';
import Chart from './Chart';
import Offers from './Offers';
import Stockcard from './Stockcard';
import StockProfile from './Stock_profile';
import StockPerformance from './StockPerformance';


export default function Detailedstockpage(props){
    return(
        <div>
                    <div class="card m-3 border border-primary container mx-auto">
                        <h3 style={{textAlign: "center"}}>Portfolio balance</h3>
                        <div className="row row-eq-height w-75 mx-auto">  
                                <div className="col card m-3 border border-info">
                                    <StockProfile stock={"AAPL"} />
                                </div>
                            
                            
                                <div className="col card m-3 border border-info" style={{textAlign: "right"}}>                                   
                                        <StockPerformance stock={"AAPL"}/>                                  
                                </div>
                            
                        </div>
                    </div>
            <div className="container-fluid">
                <div className="row w-75 mx-auto">
                    <div className="col mt-5">
                        <Stockcard symbol={props.symbol} />
                    </div>
                </div>
                <div className="row" >
                    <div className="col mt-5">
                        <Chart symbol={props.symbol} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mt-5">
                        <Offers/>
                    </div>
                </div>
            </div>
        </div>
    )
}