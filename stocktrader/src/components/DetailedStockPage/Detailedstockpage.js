import React,{useEffect, useState, useContext} from 'react';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import Chart from './Chart';
import Stockcard from './Stockcard';


export default function Detailedstockpage(props){
    const [AccData, setAccData] = useContext(MainpageAccountContext);
    const [StockData, setStockData] = useState({});

    /* butt2qv48v6skju2d1tg finnhub token */

    

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <Chart symbol={props.symbol} />
                </div>
                <div className="col">
                    <Stockcard symbol={props.symbol} />
                </div>
            </div>
        </div>
    )
}