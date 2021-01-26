import React,{useState, useEffect} from 'react';
//import './Portfolioperformance.css';
import StockStatsCard from './StockStatsCard';
import axios from 'axios';
import NumberFormat from 'react-number-format'

export default function Portfolioperformance(props) {
    const [StockPerformance, setStockPerformance] = useState({});

    useEffect(() => {
        setInterval(() => {
            axios
                .get(`http://localhost:8080/user/getStockPerformanceList/${props.stock}`)
                .then((resp) => {
                    setStockPerformance(resp.data)
                    console.log("updating!!!")
                })
        }, 20000)
    }, [])
    return(
        <div class="container w-100">
            <div class="col align-self-center">
                <StockStatsCard
                    label={"Current price"}
                    amount={<NumberFormat value={StockPerformance.stockCurrentPrice} displayType={'text'} thousandSeparator={true} prefix={'$ '}/> }
                    icon={"las la-hand-holding-usd font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Number of stocks"}
                    amount={<NumberFormat value={StockPerformance.stockTotalAmount} displayType={'text'} thousandSeparator={true} suffix={' pcs'}/>}
                    icon={"las la-atom font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Avg. pruchase price"}
                    amount={<NumberFormat value={StockPerformance.averagePurchasePrice} displayType={'text'} thousandSeparator={true} prefix={'$ '}/> }
                    icon={"las la-money-bill font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Stock value change"}
                    amount={<NumberFormat value={StockPerformance.stockValueChange * 100} displayType={'text'} thousandSeparator={true} suffix={' %'}/>}
                    icon={"las la-percent font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Purchase value"}
                    amount={<NumberFormat value={StockPerformance.totalPurchaseValue} displayType={'text'} thousandSeparator={true} prefix={'$ '}/>}  
                    icon={"las la-laptop-code font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Current value"}
                    amount={<NumberFormat value={StockPerformance.stockCurrentValue} displayType={'text'} thousandSeparator={true} prefix={'$ '}/>}
                    icon={"las la-dollar-sign font-large-3 float-left"}
                />


            </div>
        </div>
      )
}