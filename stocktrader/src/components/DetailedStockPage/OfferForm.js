import React,{useState, useEffect} from 'react';
import {Form, Button, Row, Col, Alert} from 'react-bootstrap';
import axios from "axios";
import NumberFormat from 'react-number-format';

export default function OfferForm(props){
    const [StockList, setStockList] = useState([]);
    const [Stock, setStock] = useState("");
    const [Type, setType] = useState("CHOOSE TYPE");
    const [Price, setPrice] = useState(0);
    const [Quantity, setQuantity] = useState(0);
    const [CashAvailable, setCashAvailable] = useState(0);
    const [MoneyNeeded, setMoneyNeeded] = useState(0);
    const [Variant, setVariant] = useState("");
    const [AlertText, setAlertText] = useState("");
    const [MoneyWorth, setMoneyWorth] = useState(0);

    useEffect(() => {
        getStockList()
        if (props.stock !== ""){
            setStock(props.stock)
        } else {
            setStock(props.stockList[0])
        }
        
        setStock(props.stockList[0])
        if (props.type !== ""){
            setType(props.type)
        }
        getStockDataForOffer();
    }, [Stock, props.symbol])



    function placeOffer() {
        axios
            .post(`http://localhost:8080/user/placeoffer/${Stock}/${Type}/${Quantity}/${Price}`)
            .then((resp) => {
                if(resp.status===200){
                    setAlertText(resp.data);
                    setVariant("danger");
                    alert(resp.data)
                }
            });
    }

    function getStockDataForOffer() {
        axios
            .get(`http://localhost:8080/user/getStockDataForOffer/${Stock}`)
            .then((resp) => {
                setQuantity(resp.data.stockQuantity);
                setCashAvailable(resp.data.availableCash);
            });
    }

    function getStockList() {
        axios
            .get(`http://localhost:8080/stock/getStockSymbols/`)
            .then((resp) => {
                setStockList(resp.data);
            });
    }



    useEffect(() => {
        setMoneyNeeded(Price * Quantity);
        setMoneyWorth(Price * Quantity);
    }, [Price, Quantity])

    return( 
        <Form onSubmit={placeOffer}>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Select your stock</Form.Label>
                            <Form.Control as="select" onSelect={e => {setStock(e.target.value)}} required value={Stock}>
                                {StockList.map( (stock) => {
                                    return (
                                            <option value={stock.symbol}>{Stock}</option>
                                        )
                                    }
                                    )
                                }
                            </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="type">
                        <Form.Label>Select action</Form.Label>
                            <Form.Control as="select" onChange={e => setType(e.target.value)} value={Type} required>
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
<<<<<<< HEAD
                            <Form.Control type="number" placeholder="Quantity" onChange={e => setQuantity(e.target.value)} required min={0}/>
=======
                            <Form.Control type="number" placeholder="Quantity" onChange={e => {if(Type!== "SELL"){setQuantity(e.target.value)}}} required/>
>>>>>>> feature/StockListPage
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controllId="price">
                            <Form.Label>Desired price in $</Form.Label>
                            <Form.Control type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} required min={0}/>
                    </Form.Group>
                </Col>
            </Row>
            <div className="mx-auto row row-eq-height">
                <Col>
                    <Button type="submit" >Submit offer</Button>
                </Col>
                <Col>
                    <div className="border border-primary text-center">
                        {Type==="BUY"? <h3>You have: <br />{<NumberFormat value={CashAvailable} displayType={'text'} thousandSeparator={true} prefix={"$ "}/>}</h3> : <p></p>}
                        {Type==="SELL"? <h3>Pcs available: <br /> {<NumberFormat value={Quantity} displayType={'text'} thousandSeparator={true} suffix={"pcs"}/>}</h3> : <p></p>}
                    </div>
                </Col>
                <Col>
                    <div className="border border-primary text-center">
                        {Type==="BUY"? <h3>You need: <br /> {<NumberFormat value={MoneyNeeded} displayType={'text'} thousandSeparator={true} prefix={"$ "}/>}</h3> : <p></p>}
                        {Type==="SELL"? <h3>You will get: <br /> {<NumberFormat value={MoneyWorth} displayType={'text'} thousandSeparator={true} prefix={"$ "}/>}</h3> : <p></p>}
                    </div>
                </Col>
            </div>
			<Row>
                <Col>
                    <Alert variant={Variant} show={AlertText? true : false}>
                        {AlertText}
                    </Alert>
                </Col>
            </Row>
			</Form>

    )
}