import React from 'react';
import StocksTable from '../MainPage/StocksTable';
import Chart from './Chart';
import Offers from './Offers';
import Stockcard from './Stockcard';


export default function Detailedstockpage(props){
    return(
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
    )
}