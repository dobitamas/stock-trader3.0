import React from "react";
import {Card} from 'react-bootstrap';

export default function StatsCard(props) {
    return (

        <div className="">
            <Card border="info">
                <Card.Body className='mt-1'>
                    <div className="row d-flex align-items-center">
                        <div className="col" style={{fontSize: "48px"}}>
                            <i className= {`${props.icon}`}></i>
                        </div>
                        <div className="col">
                            <h3 className="f-w-300">{props.amount}</h3>
                            <span className="d-block text-uppercase">{props.label}</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
      
    )
}
