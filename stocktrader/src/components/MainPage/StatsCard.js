import React from "react";
import {Card} from 'react-bootstrap';
import NumberFormat from 'react-number-format'

export default function StatsCard(props) {
    return (

        <div className="">
            <Card>
                <Card.Body >
                    <div className="row d-flex align-items-center">
                        <div className="col-xs mr-5" style={{fontSize: "2,5rem"}}>
                            <i className= {`${props.icon}`}></i>
                        </div>
                        <div className="col text-right">
                            <h4>{<NumberFormat value={props.amount} displayType={'text'} thousandSeparator={true} prefix={'$ '}/>}</h4>
                            <span className="d-block text-uppercase">{props.label}</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
      
    )
}
