import React from 'react';


export default function Teszt(props){
    return(
<div>
    <table className="table-fill">
        <tbody className="table-hover">
            <tr>
                
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