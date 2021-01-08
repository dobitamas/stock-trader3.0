import React from 'react';
import './Portfolioperformance.css';
import StatsCard from './StatsCard';


export default function Portfolioperformance(props) {
    return(
        <div className="col">
            <div class="shadow card mb-3 ">
                <div class="card-header">Portfolio value</div>
                <div class="card-body">
                    <StatsCard
                        label={"Total value"}
                        amount={`$ ${props.Performance.portfolioTotalValue}`}
                        icon={"las la-money-bill-wave font-large-3 float-left"}
                    /><StatsCard
                        label={"Total stock value"}
                        amount={`$ ${props.Performance.portfolioTotalStockValue}`}
                        icon={"las la-chart-line font-large-3 float-left"}
                    />
                </div>
            </div>
        </div>

      )
}