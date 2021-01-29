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
                <div className="m-3">
                        <StatsCard
                        label={"Profit in stocks"}
                        amount={`$ ${Performance.currentStockProfit}`}
                        icon={"las la-balance-scale font-large-3 float-left"}
                        /><StatsCard
                            label={"Profit in cash"}
                            amount={`$ ${Performance.investedCashProfit}`}
                            icon={"las la-piggy-bank font-large-3 float-left"} 
                        /><StatsCard
                            label={"Stock profit rate"}
                            amount={`${Performance.percentageCurrentStockProfit} %`} 
                            icon={"lar la-credit-card font-large-3 float-left"}
                        /><StatsCard
                            label={"Cash profit rate"}
                            amount={`${Performance.percentageInvestedCashProfit} %`}
                            icon={"las la-coins font-large-3 float-left"}
                        />
            </div>



        )
    }
}