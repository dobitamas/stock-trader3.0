import React,{useEffect, useState, useContext} from 'react';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import Chart from './Chart';


export default function Detailedstockpage(){
    const [AccData, setAccData] = useContext(MainpageAccountContext);

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <Chart />
                </div>
            </div>
        </div>
    )
}