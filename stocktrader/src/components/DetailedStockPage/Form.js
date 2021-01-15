import React,{useState, useEffect} from 'react';
import {Form, Button, Row, Col, Alert} from 'react-bootstrap';
import axios from "axios";

export default function OfferForm(props){
    const [Stock, setStock] = useState("");
    const [Type, setType] = useState("");
    const [Price, setPrice] = useState(0);
    const [Quantity, setQuantity] = useState(0);
    const [MoneyNeeded, setMoneyNeeded] = useState(0);


    function changeType(type){
        props.getNumber(Stock);
        setType(type);
    }


    function SendApi() {
        if(Stock === ""){
            return(<Alert variant="danger">Select stock!</Alert>)
        } else if(Type === "") {
            return(<Alert variant="danger">Choose offer type!</Alert>)
        } else if(Price === 0) {
            return(<Alert variant="danger">Set the price!</Alert>)
        } else if(Quantity === 0) {
            return(<Alert variant="danger">Set quantity!</Alert>)
        }

        axios
            .post(`http://localhost:8080/user/placeoffer/${Stock}/${Type}/${Quantity}/${Price}`)
            .then((resp) => console.log(resp));
    }

    useEffect(() => {
        setMoneyNeeded(Price * Quantity);
    }, [Price, Quantity, Type])

    return(
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="stock">
                        <Form.Label>Select your stock</Form.Label>
                            <Form.Control as="select" onChange={e => setStock(e.target.value)} required>
                                <option>Stock</option>
                                <option value={"TSLA"}>Tesla</option>
                                <option value={"AAPL"}>Apple</option>
                            </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="type">
                        <Form.Label>Select action</Form.Label>
                            <Form.Control as="select" onChange={e => changeType(e.target.value)} required>
                                <option>Type</option>
                                <option value={"BUY"}>Buy</option>
                                <option value={"SELL"}>Sell</option>
                            </Form.Control>
                    </Form.Group>
                </Col>
                
            </Row>
            <Row>
                
            </Row>
            <Row>
                <Col>
                    <Form.Group controllId="price">
                            <Form.Label>Desired quantity</Form.Label>
                            <Form.Control type="number" placeholder="Quantity" onChange={e => setQuantity(e.target.value)} required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controllId="price">
                            <Form.Label>Desired price in $</Form.Label>
                            <Form.Control type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button type="submit" onClick={SendApi}>Submit offer</Button>
                </Col>
                <Col>
                    {Type==="BUY"? <h3>You have:{`$ ${props.cash}`}</h3> : <p></p>}
                    {Type==="SELL"? <h3>Number: {props.available}</h3> : <p></p>}
                </Col>
                <Col>
                    {Type==="BUY"? <h3>You need: {`$ ${MoneyNeeded}`}</h3> : <p></p>}
                </Col>
            </Row>
			    
			</Form>

    )
}