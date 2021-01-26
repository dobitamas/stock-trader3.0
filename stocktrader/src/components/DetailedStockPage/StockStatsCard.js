import React from "react";
import {Card} from 'react-bootstrap';

export default function StatsCard(props) {
    return (

        <div className="">
            <Card border="info" style={{marginBottom: '1%'}}>
                <Card.Body className='p-3'>
                    <div className="row d-flex align-items-center">
                        <div className="col" style={{fontSize: "30px"}}>
                            <i className= {`${props.icon}`}></i>
                        </div>
                        <div className="col">
                            <h5 className="f-w-300 font-weight-bold">{props.amount}</h5>
                            <h6><span className="d-block text-uppercase" style={{fontSize: "10px"}}>{props.label}</span></h6>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
      
    )
}
