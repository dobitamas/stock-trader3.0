import React from 'react';
import StatsCard from './StatsCard';


export default function CashStockProfit(props) {
    return(
            <div className="m-3">
                    <StatsCard
                    label={"Profit in stocks"}
                    amount={`$ ${props.Performance.currentStockProfit}`}
                    icon={"las la-balance-scale font-large-3 float-left"}
                    /><StatsCard
                        label={"Profit in cash"}
                        amount={`$ ${props.Performance.investedCashProfit}`}
                        icon={"las la-piggy-bank font-large-3 float-left"} 
                    /><StatsCard
                        label={"Stock profit rate"}
                        amount={`${props.Performance.percentageCurrentStockProfit} %`} 
                        icon={"lar la-credit-card font-large-3 float-left"}
                    /><StatsCard
                        label={"Cash profit rate"}
                        amount={`${props.Performance.percentageInvestedCashProfit} %`}
                        icon={"las la-coins font-large-3 float-left"}
                    />
        </div>



      )
}