import React from "react";
import {Card} from 'react-bootstrap';
import NumberFormat from 'react-number-format'

export default function StatsCard(props) {
    return (

        <div className="">
            <Card>
                <Card.Body className="py-1">
                    <div className="row d-flex align-items-center">
                        <div className="col-xs mr-2">
                            <i className= {`${props.icon}`}></i>
                        </div>
                        <div className="col text-right">
                            <h4>{<NumberFormat value={props.amount} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={props.prefix} suffix={props.suffix} />} </h4>
                            <span className="d-block text-uppercase">{props.label}</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
      
    )
}
