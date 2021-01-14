import React from 'react';
import PieChart from './PieChart';
import Portfolioperformance from './Portfolioperformance';

export default function NewPortfolioPerformance(props){
    
    return(
    <div>
        <div className="row">
            <div className="col">
                <div>
                    <PieChart series={[props.portfolioPerformance.percentageStockValue, props.portfolioPerformance.percentageCashValue]}/>
                </div>
            </div>
            <div className="col">
                <div style={{textAlign: "right"}}>
                    <Portfolioperformance Performance={props.portfolioPerformance} />
                </div>
            </div>
        </div>
    </div>
)
}