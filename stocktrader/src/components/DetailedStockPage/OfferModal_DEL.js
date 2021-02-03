import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {Form, Row, Col, Alert} from 'react-bootstrap';
import axios from "axios";
import NumberFormat from 'react-number-format';


export default function OfferModal(props) {
    const [show, setShow] = useState(false);
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
        setSymbol(props.symbol)
        getStockDataForOffer(props.symbol)
        setType(props.type)
        setQuantity(props.quantity)
        setPrice(props.price)
        setTransactionValue(props.price * props.quantity)
        //setId(props.id)

    }, []) 


    function deleteOffer() {
        axios
            .delete(`http://localhost:8080/user/deleteoffer/${props.id}`)
            .then((resp) => {
                alert(resp.data)
                if(resp.data === "Offer deleted!"){
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


    

    return (
        <React.Fragment>
            <button className="item" data-toggle="tooltip" data-placement="top" title="Delete" onClick={handleShow} type="submit">
                <i className="la la-trash" />
            </button>
             <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                <Modal.Title>Delete Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action="#" onSubmit={deleteOffer}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Select your stock</Form.Label>
                                        <Form.Control type="text" placeholder={props.symbol} readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="type">
                                    <Form.Label>Select action</Form.Label>
                                    <Form.Control type="text" placeholder={props.type} readOnly />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controllId="price">
                                        <Form.Label>Desired quantity</Form.Label>
                                        <Form.Control type="number" placeholder={props.quantity} readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controllId="price">
                                        <Form.Label>Desired price in $</Form.Label>
                                        <Form.Control type="number" placeholder={props.price} readOnly />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="mx-auto row row-eq-height">

                            <Col>
                                <div className="d-flex border border-primary text-center align-items-center justify-content-center">
                                    {Type==="BUY"? <div><h8>Cash available:</h8> <br /><h5>{<NumberFormat value={CashAvailable} displayType={'text'} thousandSeparator={true} prefix={"$ "}/>}</h5></div> : <p></p>}
                                    {Type==="SELL"? <div><h8>Stock available:</h8> <br /> <h5>{<NumberFormat value={QuantityAvailable} displayType={'text'} thousandSeparator={true} suffix={" pcs"}/>}</h5></div> : <p></p>}
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex border border-primary text-center align-items-center justify-content-center">
                                    <div><h8>Transaction value:</h8> <br /> <h5>{<NumberFormat value={TransactionValue} displayType={'text'} thousandSeparator={true} prefix={"$ "}/>}</h5></div>
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
                                DELETE
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
