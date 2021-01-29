import React,{useState, useEffect} from 'react';
import './Portfolioperformance.css';
import StatsCard from './StatsCard';
import axios from 'axios';

export default function Portfolioperformance(props) {
    const [Performance, setPerformance] = useState({});

    useEffect(() => {
        setPerformance(props.portfolioPerformance_Portfolioperformance)

    }, [props.portfolioPerformance_Portfolioperformance])

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
            <div className="w-100"> 
                <StatsCard
                    label={"Total value"}
                    amount={`${Performance.portfolioTotalValue}`}
                    icon={"las la-money-bill-wave float-left"}
                />
                <StatsCard
                    label={"Total stock value"}
                    amount={`${Performance.portfolioTotalStockValue}`}
                    icon={"las la-chart-line font-large-3 float-left"}
                />
            </div>
        )
      }
}