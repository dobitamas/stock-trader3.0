import React,{useEffect, useState, useContext} from 'react';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import Chart from './Chart';


export default function Detailedstockpage(props){
    const [AccData, setAccData] = useContext(MainpageAccountContext);
    const [StockData, setStockData] = useState({});

    /* butt2qv48v6skju2d1tg finnhub token */

    useEffect(() => {
        const axios = require('axios');
        axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${props.symbol}&token=butt2qv48v6skju2d1tg`)
            .then(function(resp) {
                setStockData(resp.data);
            })
    }, [])

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <Chart />
                </div>
                <div className="col">
                    {/* */}
                </div>
            </div>
        </div>
    )
}