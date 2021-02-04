import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import dayjs from "dayjs";
import OfferModal from '../DetailedStockPage/OfferModal.js';
import OfferModalEdit from '../DetailedStockPage/OfferModal_EDIT.js'
import OfferModalDel from '../DetailedStockPage/OfferModal_DEL.js'

export default function StocksTable(){
    const [OfferList, setOfferList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/user/getalloffers")
            .then((resp) => setOfferList(resp.data));

    }, [])


    
    return(
        <div className="m-3 border border-info">
            <Card>
                <Card.Body className='mx-auto'>
                    <Table responsive className='table-responsive'>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>QUANTITY</th>
                                <th>TOTAL VALUE</th>
                                <th>PRICE</th>
                                <th>OFFER TYPE</th>
                                <th>OFFER DATE</th>
                                <th><OfferModal symbol={""} type={""}/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {OfferList.map( (object, i) => {
                                return(
                                    <React.Fragment key={i}>
                                        <tr className="tr-shadow">
                                            <a href={`/stockpage/${object.stock.symbol}`}>
                                                <td className="text-center">{object.stock.name}</td>
                                            </a>
                                            <td className="text-center">{<NumberFormat value={object.quantity} displayType={'text'} thousandSeparator={" "} decimalScale={2}/>}</td>
                                            <td className="text-center">{<NumberFormat value={object.totalValue} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>}</td>
                                            <td className="text-center">{<NumberFormat value={object.price} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>}</td>
                                            <td className="text-center">{object.offerType}</td>
                                            <td className="text-center">{dayjs(object.offerDate).format('YYYY MMM DD HH:mm')}</td>
                                            <td>
                                                <div className="d-inline-flex table-data-feature">
                                                    <OfferModalEdit symbol={object.stock.symbol} type={object.offerType} quantity={object.quantity} price={object.price} id={object.id}/>
                                                    <OfferModalDel symbol={object.stock.symbol} type={object.offerType} quantity={object.quantity} price={object.price} id={object.id}/>
                                                </div>
                                            </td>
                                        </tr>    
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
      )
    
}