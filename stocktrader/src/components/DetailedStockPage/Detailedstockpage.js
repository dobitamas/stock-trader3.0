import React from 'react';
import StocksTable from '../MainPage/StocksTable';
import Chart from './Chart';
import Offers from './Offers';
import Stockcard from './Stockcard';
import LineChart from '../MainPage/LineChart';
import StockProfile from './Stock_profile';
import Portfolioperformance from '../MainPage/Portfolioperformance';


export default function Detailedstockpage(props){
    return(
        <div>
            <div className="row">
                <div className="col">
                    <div class="card m-3 border border-primary container-fluid" >
                    <h3 style={{textAlign: "center"}}>Portfolio balance</h3>
                        <div className="row">
                            <div className="col">
                                <div className="card m-3 border border-info">
                                    <StockProfile stock={"AAPL"} />
                                </div>
                            </div>
                            <div className="col">
                                <div style={{textAlign: "right"}}>
                                    <div className=" card m-3 border border-info">
                                        <Portfolioperformance />
                                        <LineChart/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="container-fluid">
                <div className="row w-75 mx-auto">
                    <div className="col mt-8">
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