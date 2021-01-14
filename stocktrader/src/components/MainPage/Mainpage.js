import React,{useContext} from 'react';
import PieChart from './Piechart';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import Portfolioperformance from './Portfolioperformance';
import CashStockProfit from './CashStockProfit';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';


export default function Mainpage(){
    const [AccData] = useContext(MainpageAccountContext);

    return(
        <div className="container-fluid,">
            <div className="row">
                <div className="col">
                    <div class="card text-white bg-primary mb-3">
                        <div class="card-header">Portfolio balance</div>
                            <div class="card-body">
                                <PieChart series={[AccData.portfolioPerformance.percentageStockValue, AccData.portfolioPerformance.percentageCashValue]} />
                            </div>
                    </div>    
                </div>
                <Portfolioperformance Performance={AccData.portfolioPerformance} />                
            </div>
            <div className="row">
                <div className="col">
                <div class="card text-white bg-primary mb-3">
                        <div class="card-header">Portfolio performance</div>
                            <div class="card-body">
                            <CashStockProfit Performance={AccData.portfolioPerformance} />
                            </div>
                    </div>
                </div>
                <div className="col">
                    {/*<Profit />*/}
                </div>
            </div>
        </div>
    )
}