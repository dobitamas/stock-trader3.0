import React from 'react';
import './CashStockProfit.css';
import StatsCard from './StatsCard';


export default function CashStockProfit(props) {
    return(
        <div className="col">
        <div class="shadow card mb-3 ">
    <div class="card-header">Portfolio performance</div>
    <div class="card-body">
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
</div>
</div>



      )
}