import React,{useState, useEffect} from 'react';
import './CashStockProfit.css';


export default function CashStockProfit(props) {
    return(
        <div>
            <table className="table-fill">
                <tbody className="table-hover">
                    <tr>
                        <td className="text-left">Current profit in stocks:</td>
                        <td className="text-left">{`$ ${props.Performance.currentStockProfit}`}</td>
                    </tr>
                    <tr>
                        <td className="text-left">Current profit in cash:</td>
                        <td className="text-left">{`$ ${props.Performance.investedCashProfit}`}</td>
                    </tr>
                    <tr>
                        <td className="text-left">Current stock profit rate:</td>
                        <td className="text-left">{`${props.Performance.percentageCurrentStockProfit} %`}</td>
                    </tr>
                    <tr>
                        <td className="text-left">Current cash profit rate:</td>
                        <td className="text-left">{`${props.Performance.percentageInvestedCashProfit} %`}</td>
                    </tr>
                </tbody>
            </table>
        </div>

      )
}