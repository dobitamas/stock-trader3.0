import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {Form, Row, Col, Alert} from 'react-bootstrap';
import axios from "axios";
import NumberFormat from 'react-number-format';


export default function OfferModal(props) {
    const [show, setShow] = useState(false);
    const [SymbolList, setSymbolList] = useState([]);
    const [Symbol, setSymbol] = useState("");
    const [Type, setType] = useState("");

    //SELL
    const [QuantityAvailable, setQuantityAvailable] = useState(0);
    //BUY
    const [CashAvailable, setCashAvailable] = useState(0);

    //BUY-SELL
    const [Price, setPrice] = useState(0);
    const [Quantity, setQuantity] = useState(0);
    const [TransactionValue, setTransactionValue] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    useEffect(() => {
        setTransactionValue(Price * Quantity);
    }, [Price, Quantity])

    useEffect(() => {
        getSymbolList()
        setSymbol(props.symbol)
        getStockDataForOffer(props.symbol)
        setType(props.type)
        setQuantity(props.quantity)
        setPrice(props.price)
        setTransactionValue(props.price * props.quantity)
    }, []) 


    function replaceOffer() {
        axios
            .post(`http://localhost:8762/user/replaceoffer/${props.id}/${Symbol}/${Type}/${Quantity}/${Price}`)
            .then((resp) => {
                alert(resp.data)
                setTimeout(() => {console.log("setTimeout")}, 200)
                if(resp.data === "Offer Replaced!"){
                    window.location.reload();
                }
            })
    }

    function getStockDataForOffer(requestedSymbol) {
        console.log("updating: "+requestedSymbol)
            axios
                .get(`http://localhost:8762/user/getStockDataForOffer/${requestedSymbol}`)
                .then((resp) => {
                    console.log(resp.data)
                    setQuantityAvailable(resp.data.stockQuantity);
                    setCashAvailable(resp.data.availableCash);
                });
    }

    function getSymbolList() {
        axios
            .get(`http://localhost:8080/stock/getStockSymbols`)
            .then((resp) => {
                setSymbolList(resp.data);
            });
    }


    

    return (
        <React.Fragment>
            <button className="item" data-toggle="tooltip" data-placement="top" title="Edit" onClick={handleShow}>
                <i className="las la-edit" />
            </button>
             <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                <Modal.Title>EDIT Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action="#" onSubmit={replaceOffer}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Select your stock</Form.Label>
                                        <Form.Control as="select" onChange={e => {getStockDataForOffer(e.target.value); setSymbol(e.target.value)}} required defaultValue={Symbol}>
                                            {SymbolList.map( (symbol) => {
                                                return (
                                                        <option value={symbol}>{symbol}</option>
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
                                        <Form.Control as="select" onChange={e => setType(e.target.value)} defaultValue={props.type} required>
                                            <option hidden value={props.type}>{props.type}</option>
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
                                        <Form.Control type="number" value={Quantity} onChange={e => setQuantity(e.target.value)} required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controllId="price">
                                        <Form.Label>Desired price in $</Form.Label>
                                        <Form.Control type="number" value={Price} onChange={e => setPrice(e.target.value)} required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="mx-auto row row-eq-height">

                            <Col>
                                <div className="d-flex border border-primary text-center align-items-center justify-content-center">
                                    {Type === "" ? <div>ENTER DATA...</div> : <p></p>}
                                    {Type==="BUY"? <div><h8>Cash available:</h8> <br /><h5>{<NumberFormat value={CashAvailable} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>}</h5></div> : <p></p>}
                                    {Type==="SELL"? <div><h8>Stock available:</h8> <br /> <h5>{<NumberFormat value={QuantityAvailable} displayType={'text'} thousandSeparator={" "} decimalScale={2} suffix={" pcs"}/>}</h5></div> : <p></p>}
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex border border-primary text-center align-items-center justify-content-center">
                                    {Type === "" ? <div>ENTER DATA...</div> : <p></p>}
                                    {Type==="BUY"? <div><h8>Transaction value:</h8> <br /> <h5>{<NumberFormat value={TransactionValue} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>}</h5></div> : <p></p>}
                                    {Type==="SELL"? <div><h8>Transaction value:</h8> <br /> <h5>{<NumberFormat value={TransactionValue} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>}</h5></div> : <p></p>}
                                </div>
                            </Col>
                        </div>
                        <Row>
                            <Col>
                            {/*
                                <Alert variant={Variant} show={AlertText? true : false}>
                                    {AlertText}
                                </Alert>
                            */}
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button type="submit" variant="primary" className="mt-2">
                                REPLACE
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    CANCEL
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
