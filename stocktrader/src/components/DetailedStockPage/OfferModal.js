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
        getSymbolList()
        if (props.symbol !== ""){
            setSymbol(props.symbol)
            getStockDataForOffer(props.symbol)
        } else {
            setSymbol(SymbolList[0])
        }
        if (props.type !== ""){
            setType(props.type)
        };

    }, []) 

    useEffect(() => {
        setTransactionValue(Price * Quantity);
    }, [Price, Quantity])


    function placeOffer() {
        console.log(`http://localhost:8080/user/placeoffer/${Symbol}/${Type}/${Quantity}/${Price}`)
        axios
            .post(`http://localhost:8080/user/placeoffer/${Symbol}/${Type}/${Quantity}/${Price}`)
            .then((resp) => {
                alert(resp.data)
                if(resp.data === "Offer Accepted!"){
                    window.location.reload();
                }
            })
    }

    function getStockDataForOffer(requestedSymbol) {
        console.log("updating: "+requestedSymbol)
            axios
                .get(`http://localhost:8080/user/getStockDataForOffer/${requestedSymbol}`)
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
            <Button variant="primary" onClick={_=> {handleShow(); setPrice(0); setQuantity(0)}}>
                Add new offer
            </Button>
             <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                <Modal.Title>Place offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action="#" onSubmit={placeOffer}>
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
                                        <Form.Control as="select" onChange={e => setType(e.target.value)} defaultValue="CHOOSE TYPE" required>
                                            <option hidden value={"CHOOSE TYPE"}>CHOOSE TYPE</option>
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
                        <div className="mx-auto row row-eq-height">

                            <Col>
                                <div className="d-flex border border-primary text-center align-items-center justify-content-center">
                                    {Type === "" ? <div>ENTER DATA...</div> : <p></p>}
                                    {Type==="BUY"? <div><h8>Cash available:</h8> <br /><h5>{<NumberFormat value={CashAvailable} displayType={'text'} thousandSeparator={true} prefix={"$ "}/>}</h5></div> : <p></p>}
                                    {Type==="SELL"? <div><h8>Stock available:</h8> <br /> <h5>{<NumberFormat value={QuantityAvailable} displayType={'text'} thousandSeparator={true} suffix={" pcs"}/>}</h5></div> : <p></p>}
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex border border-primary text-center align-items-center justify-content-center">
                                    {Type === "" ? <div>ENTER DATA...</div> : <p></p>}
                                    {Type==="BUY"? <div><h8>Transaction value:</h8> <br /> <h5>{<NumberFormat value={TransactionValue} displayType={'text'} thousandSeparator={true} prefix={"$ "}/>}</h5></div> : <p></p>}
                                    {Type==="SELL"? <div><h8>Transaction value:</h8> <br /> <h5>{<NumberFormat value={TransactionValue} displayType={'text'} thousandSeparator={true} prefix={"$ "}/>}</h5></div> : <p></p>}
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
                                SUBMIT
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
