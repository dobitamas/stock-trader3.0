import React, {useState, useEffect} from 'react';
import Portfolioperformance from './Portfolioperformance';
import CashStockProfit from './CashStockProfit';
//import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import StocksTable from './StocksTable';
import OffersTable from './OffersTable';
import LineChart from './LineChart';
import Profile from './Profile';
import axios from 'axios';
import { useCookies } from "react-cookie";


export default function Mainpage(){
    const [PortfolioPerformance, setPortfolioPerformance] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        getPortfolioPerformance()
        setInterval(() => {
            getPortfolioPerformance()
        }, 10000)
    }, [])

    
    function getPortfolioPerformance() {
        axios
            .get("http://localhost:8762/auth/user/getportfolioperformance", {
                headers: { Authorization: `Bearer ${cookies["auth"]}` }
            })
            .then((resp) => {
                setPortfolioPerformance(resp.data)
            }
            );
    }

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
                        <div className="card m-3 border border-primary container-fluid" style={{maxWidth: '97%'}}>
                            <h3 className="pt-2" style={{textAlign: "center"}}>Portfolio balance</h3>
                            <div className="row row-eq-height w-100 mx-auto">
                                <div className="col ml-5 mr-4 card m-3 border border-info">
                                    <Profile totalPortfolioValue={PortfolioPerformance.portfolioTotalValue} investedCash={PortfolioPerformance.investedCash}/>
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
                        <div className="card m-3 border border-primary" style={{maxWidth: '97%'}}>
                            <h3 className="pt-2" style={{textAlign:"center"}}>Stock performance</h3>
                                <div style={{textAlign: "center"}}>
                                    <StocksTable/>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card m-3 border border-primary" style={{maxWidth: '97%'}}>
                            <h3 className="pt-2" style={{textAlign:"center"}}>Offer List</h3>
                                <div style={{textAlign: "center"}}>
                                    <OffersTable/>
                                </div>
                        </div>
                    </div>
                </div>     
            </div>
        );
      }
}