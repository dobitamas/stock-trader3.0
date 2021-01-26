import React,{useState, useEffect} from 'react';
import './Portfolioperformance.css';
import StatsCard from './StatsCard';
import axios from 'axios';

export default function Portfolioperformance(props) {
    const [Performance, setPerformance] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:8080/user/getportfolioperformance")
            .then((resp) => setPerformance(resp.data));

    }, [])
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