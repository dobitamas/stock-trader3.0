import React,{useState, useEffect} from 'react';
import {Form, Button, Row, Col, Alert} from 'react-bootstrap';
import axios from "axios";

export default function EditForm(props){
    const [Stock, setStock] = useState(props.stock);
    const [Type, setType] = useState(props.type);
    const [Price, setPrice] = useState(props.price);
    const [Quantity, setQuantity] = useState(props.quantity);
    const [MoneyNeeded, setMoneyNeeded] = useState(0);
    

    function changeType(type){
        setType(type);
        props.getNumber(Stock);
    }


    function SendApi() {
        if(Stock === ""){
            alert(<Alert variant="danger">Select stock!</Alert>)
        } else if(Type === "") {
            alert(<Alert variant="danger">Choose offer type!</Alert>)
        } else if(Price === 0) {
            alert(<Alert variant="danger">Set the price!</Alert>)
        } else if(Quantity === 0) {
            alert(<Alert variant="danger">Set quantity!</Alert>)
        }

        axios
            .post(`http://localhost:8080/user/replaceoffer/${props.id}/${Stock}/${Type}/${Quantity}/${Price}`)
            .then((resp) => console.log(resp));
    }

    useEffect(() => {
        setMoneyNeeded(Price * Quantity);
    }, [Price, Quantity])

    return(
        <div>
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="stock">
                        <Form.Label>Select your stock</Form.Label>
                            <Form.Control as="select" onChange={e => setStock(e.target.value)} value={Stock} required>
                                <option>Stock</option>
                                <option value={"TSLA"}>Tesla</option>
                                <option value={"AAPL"}>Apple</option>
                            </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="type">
                        <Form.Label>Select action</Form.Label>
                            <Form.Control as="select" onChange={e => changeType(e.target.value)} value={Type} required>
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
                    <Form.Group controllId="quantity">
                            <Form.Label>Desired quantity</Form.Label>
                            <Form.Control type="number" placeholder="Quantity" onChange={e => setQuantity(e.target.value)} value={Quantity} required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controllId="price">
                            <Form.Label>Desired price in $</Form.Label>
                            <Form.Control type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} value={Price} required/>
                    </Form.Group>
                </Col>
            </Row>
                <Row>
                    <Col>
                        <Button type="submit" onClick={SendApi}>Submit change!</Button>
                    </Col>
                    <Col>
                        {Type==="BUY"? <h3>You have:{`$ ${props.cash}`}</h3> : <p></p>}
                        {Type==="SELL"? <h3>Number:{props.available}</h3> : <p></p>}
                    </Col>
                    <Col>
                        {Type==="BUY"? <h3>You need: {`$ ${MoneyNeeded}`}</h3> : <p></p>}
                    </Col>
                </Row> 
			</Form> 
        </div>
        
    )
}