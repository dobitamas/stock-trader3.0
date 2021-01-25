import React,{useState, useEffect} from 'react';
import StatsCard from './StatsCard';
import axios from 'axios';

export default function CashStockProfit() {
    const [Performance, setPerformance] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:8080/user/getportfolioperformance")
            .then((resp) => setPerformance(resp.data));

    }, [])

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