import React,{useEffect, useState, useContext} from 'react';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import Chart from './Chart';
import Offers from './Offers';
import Stockcard from './Stockcard';


export default function Detailedstockpage(props){
    const [AccData, setAccData] = useContext(MainpageAccountContext);
    const [StockData, setStockData] = useState({});

    /* butt2qv48v6skju2d1tg finnhub token */

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
                    <Offers />
                </div>
            </div>
        </div>
    )
}