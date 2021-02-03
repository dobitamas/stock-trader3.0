import React,{useState, useEffect} from 'react';
import {Card, Body, Header} from 'react-bootstrap';
import './LineChart.scss';
import axios from 'axios';


export default function LineChart(props){
    const [Performance, setPerformance] = useState({});

    useEffect(() => {
        setPerformance(props.portfolioPerformance_LineChart)
    }, [props.portfolioPerformance_LineChart])

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
            <div className="card m-3 border border-info">
                <Card>
                    <Card.Header>
                        <h3 style={{textAlign:"center"}}>Cash/Stock rate</h3>
                    </Card.Header>
                    <Card.Body>
                    <div className="progress" style={{height:"2rem"}}>
                        <div className="progress-bar bg-success" style={{width: `${Performance.percentageCashValue}%`}} role="progressbar" aria-valuenow={Performance.percentageCashValue} aria-valuemin="0" aria-valuemax="100">{Performance.percentageCashValue}</div>
                        <div className="progress-bar" style={{width: `${Performance.percentageStockValue}%`}} role="progressbar" aria-valuenow={Performance.percentageStockValue} aria-valuemin="0" aria-valuemax="100">{Performance.percentageStockValue}</div>
                    </div>  
                    </Card.Body>
                </Card>
            </div>
        )
    }
}