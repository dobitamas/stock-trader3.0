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
                        label={"Total Cash"}
                        amount={"123 456 $"}
                        icon={"las la-money-bill-wave font-large-3 float-left"}
                    />
                </div>
            </div>
        </div>

      )
}