import React,{useContext} from 'react';
import PieChart from './Piechart';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import Portfolioperformance from './Portfolioperformance';
import CashStockProfit from './CashStockProfit';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import StocksTable from './StocksTable';
import LineChart from './LineChart';
import Profile from './Profile';


export default function Mainpage(){
    const [AccData] = useContext(MainpageAccountContext);

    return(
        <div>
            <div className="row">
                <div className="col">
                    <div class="card m-3 border border-primary container-fluid" >
                        <h3 style={{textAlign: "center"}}>Portfolio balance</h3>
                        <div className="row">
                            <div className="col">
                                <div className="card m-3 border border-info">
                                    <Profile />
                                </div>
                            </div>
                            <div className="col">
                                <div style={{textAlign: "right"}}>
                                    <div className=" card m-3 border border-info">
                                        <Portfolioperformance Performance={AccData.portfolioPerformance} />
                                        <LineChart Performance={AccData.portfolioPerformance}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                            
            </div>
            <div className="row">
                <div className="col">
                        <div class="card m-3 border border-primary container-fluid">
                            <h3 style={{textAlign: "center"}}>Portfolio balance</h3>
                                <div style={{textAlign: "right"}}>
                                    <CashStockProfit Performance={AccData.portfolioPerformance} />
                                </div>
                        </div>    
                    </div>
                <div className="col">
                    {/*<Profit />*/} 
                    
                </div>
            </div>
            <div className="row">
            <div className="col">
                    <div className="card m-3 border border-primary">
                        <h3 style={{textAlign:"center"}}>Portfolio performance</h3>
                            <div style={{textAlign: "center"}}>
                                <StocksTable/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}