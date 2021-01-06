import React,{useEffect, useState, useContext} from 'react';
import PieChart from './Piechart';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import Portfolioperformance from './Portfolioperformance';
import CashStockProfit from './CashStockProfit';


export default function Mainpage(){
    const [AccData, setAccData] = useContext(MainpageAccountContext);

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <PieChart series={[AccData.portfolioPerformance.percentageStockValue, AccData.portfolioPerformance.percentageCashValue]} />
                </div>
                <div className="col">
                    <Portfolioperformance Performance={AccData.portfolioPerformance} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <CashStockProfit Performance={AccData.portfolioPerformance} />
                </div>
                <div className="col">
                    {/*<Profit />*/}
                </div>
            </div>
        </div>
    )
}