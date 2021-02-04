import React,{useState, useEffect} from 'react';
//import './Portfolioperformance.css';
import StockStatsCard from './StockStatsCard';
import axios from 'axios';
import NumberFormat from 'react-number-format'

export default function Portfolioperformance(props) {
    const [StockPerformance, setStockPerformance] = useState({});

    useEffect(() => {
        getStockPerformance();
        setInterval(() => {
            getStockPerformance();
        }, 20000)

    }, [])


    function getStockPerformance() {
        axios
            .get(`http://localhost:8080/user/getStockPerformance/${props.symbol}`)
            .then((resp) => {
                setStockPerformance(resp.data)
                console.log("getStockPerfomanceList")
                console.log(resp.data)
            })
    }

    if (StockPerformance == null) {
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
        <div class="container w-100">
            <div class="col align-self-center">
                <StockStatsCard
                    label={"Current price"}
                    amount={<NumberFormat value={StockPerformance.stockCurrentPrice} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={'$ '}/> }
                    icon={"las la-hand-holding-usd font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Number of stocks"}
                    amount={<NumberFormat value={StockPerformance.stockTotalAmount} displayType={'text'} thousandSeparator={" "} decimalScale={2} suffix={' pcs'}/>}
                    icon={"las la-atom font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Avg. pruchase price"}
                    amount={<NumberFormat value={StockPerformance.averagePurchasePrice} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={'$ '}/>}
                    icon={"las la-money-bill font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Stock value change"}
                    amount={<NumberFormat value={StockPerformance.stockValueChange * 100} displayType={'text'} thousandSeparator={" "} decimalScale={2} suffix={' %'}/>}
                    icon={"las la-percent font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Purchase value"}
                    amount={<NumberFormat value={StockPerformance.totalPurchaseValue} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={'$ '}/>}  
                    icon={"las la-laptop-code font-large-3 float-left"}
                />
                <StockStatsCard
                    label={"Current value"}
                    amount={<NumberFormat value={StockPerformance.stockCurrentValue} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={'$ '}/>}
                    icon={"las la-dollar-sign font-large-3 float-left"}
                />


            </div>
        </div>
      )
    }
}