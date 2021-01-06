import React from 'react';
import './Portfolioperformance.css';


export default function Portfolioperformance(props) {
    return(
        <div>
            <div className="table-title">
                <h3>Portfolioperformance</h3>
            </div>
            <table className="table-fill">
<tbody className="table-hover">
<tr>
<td className="text-left">Portfolio value:</td>
<td className="text-left">{`$ ${props.Performance.portfolioTotalValue}`}</td>
</tr>
<tr>
<td className="text-left">Stock value:</td>
<td className="text-left">{`$ ${props.Performance.portfolioTotalStockValue}`}</td>
</tr>
</tbody>
</table>
</div>

      )
}