import React,{useState, useEffect} from 'react';
import StatsCard from './StatsCard';
import axios from 'axios';

export default function CashStockProfit(props) {
    const [Performance, setPerformance] = useState({});

    useEffect(() => {
        setPerformance(props.portfolioPerformance_CashStockProfit)
    }, [props.portfolioPerformance_CashStockProfit])

    if (Performance === null) {
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
                <div className="my-auto">
                        <StatsCard
                        label={"Profit on stocks"}
                        amount={`$ ${Performance.currentStockProfit}`}
                        icon={"las la-coins fa-3x float-left"}
                        prefix={"$ "}
                        /><StatsCard
                        label={"Profit rate on stocks"}
                        amount={`${Performance.percentageCurrentStockProfit} %`} 
                        icon={"las la-balance-scale fa-3x float-left"}
                        suffix={" %"}
                        /><StatsCard
                            label={"Profit on portfolio"}
                            amount={`$ ${Performance.investedCashProfit}`}
                            icon={"las la-coins fa-3x float-left"}
                            prefix={"$ "} 
                        /><StatsCard
                            label={"Profit rate on portfolio"}
                            amount={`${Performance.percentageInvestedCashProfit} %`}
                            icon={"las la-balance-scale fa-3x float-left"}
                            suffix={" %"}
                        />
            </div>



        )
    }
}