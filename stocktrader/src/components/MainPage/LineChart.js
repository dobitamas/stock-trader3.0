import React,{useState, useEffect} from 'react';
import {Card, Body, Header} from 'react-bootstrap';
import './LineChart.scss';
import axios from 'axios';


export default function LineChart(props){
    const [Performance, setPerformance] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:8080/user/getportfolioperformance")
            .then((resp) => setPerformance(resp.data));
    }, [])

    return(
        <div className="card m-3 border border-info">
            <Card>
                <Card.Header>
                    <h3 style={{textAlign:"center"}}>Cash/Stock rate</h3>
                </Card.Header>
                <Card.Body>
                    <div className="row d-flex align-items-center">
                        <div className="col-9">
                            <h5 className="f-w-300 d-flex align-items-center m-b-0">{`${Performance.percentageCashValue} %`}</h5>
                        </div>

                        <div className="col-3 text-right">
                            <h5 className="f-w-300 d-flex align-items-center m-b-0">{`${Performance.percentageStockValue} %`}</h5>
                        </div>
                    </div>
                    <div className="progress m-t-30" style={{height: '7px'},{maxWidth: "100"}}>
                        <div className="progress-bar progress-c-theme" role="progressbar" style={{width: `${Performance.percentageCashValue}%`}} aria-valuemin="0" aria-valuemax="100"/>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}