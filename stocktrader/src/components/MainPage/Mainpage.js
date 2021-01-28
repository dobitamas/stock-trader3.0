import React, {useState, useEffect} from 'react';
import Portfolioperformance from './Portfolioperformance';
import CashStockProfit from './CashStockProfit';
//import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import StocksTable from './StocksTable';
import LineChart from './LineChart';
import Profile from './Profile';
import axios from 'axios';


export default function Mainpage(){
    const [PortfolioPerformance, setPortfolioPerformance] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:8080/user/getportfolioperformance")
            .then((resp) => {
                setPortfolioPerformance(resp.data)
                console.log("MAINPAGE INCOMING: ")
                console.log(resp.data)
            }
            );
    }, [])

    if (Object.keys(PortfolioPerformance).length === 0) {
        return (
            <div>
                <img
                  className = "mx-auto d-block"
                  id="loading"
                  src="/candle_loader.gif"
                  alt="loading candle chart"
                  width="70%"
                  height="auto"
                />
            </div>
        );
      } else {
        return(
            <div>
                <div className="row">
                    <div className="col">
                        <div class="card m-3 border border-primary container-fluid" >
                            <h3 style={{textAlign: "center"}}>Portfolio balance</h3>
                            <div className="row row-eq-height w-100 mx-auto">
                                <div className="col ml-5 mr-4 card m-3 border border-info">
                                    <Profile/>
                                </div>
                                <div className="col ml-5 mr-4 card m-3 border border-info">
                                    <Portfolioperformance portfolioPerformance_Portfolioperformance={PortfolioPerformance}/>
                                    <LineChart portfolioPerformance_LineChart={PortfolioPerformance}/>
                                </div>
                                <div className="col ml-5 mr-4 card m-3 border border-info" >
                                    <CashStockProfit portfolioPerformance_CashStockProfit={PortfolioPerformance}/>
                                </div>
                            </div>
                        </div>
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
        );
      }
}