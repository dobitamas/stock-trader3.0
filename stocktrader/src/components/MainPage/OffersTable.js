import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import dayjs from "dayjs";
import OfferModal from '../DetailedStockPage/OfferModal.js';
import OfferModalEdit from '../DetailedStockPage/OfferModal_EDIT.js'
import OfferModalDel from '../DetailedStockPage/OfferModal_DEL.js'
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useCookies } from "react-cookie";


export default function StocksTable(){
    const [OfferList, setOfferList] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [Columns, setColumns] = useState([
        {
            dataField: "stock.name",
            text: "Name",
            sort: true,
            formatter: (cell, row) => <a href={`/stockpage/${row.stock.symbol}`}> {cell} </a>
    
        },
        {
            dataField: "quantity",
            text: "Quantity",
            sort: true,
            formatter: (cell, row) => <NumberFormat value={row.quantity} displayType={'text'} thousandSeparator={" "} decimalScale={2}/>
        },
        {
            dataField: "totalValue",
            text: "Total Value",
            sort: true,
            formatter: (cell, row) => <NumberFormat value={row.totalValue} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>
        },
        {
            dataField: "price",
            text: "Price",
            sort: true, 
            formatter: (cell, row) => <NumberFormat value={row.price} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>
        },
        {
            dataField: "offerType",
            text: "Offer Type",
            sort: true,
            formatter: (cell, row) => returnOfferIcon(cell)
            
        },
        {
            dataField: "offerDate",
            text: "Offer Date",
            sort: true,
            formatter: (cell, row) => <p>{dayjs(cell).format('YYYY MMM DD HH:mm')}</p>
        },
        {
            
            text: <OfferModal symbol={""} type={""}/>,
            formatter: (cell, row) => <div className="d-inline-flex table-data-feature"><OfferModalEdit symbol={row.stock.symbol} type={row.offerType} quantity={row.quantity} price={row.price} id={row.id}/>
            <OfferModalDel symbol={row.stock.symbol} type={row.offerType} quantity={row.quantity} price={row.price} id={row.id}/></div>
        }
        
    ])

    useEffect(() => {
        axios
            .get("http://localhost:8762/auth/user/getalloffers", {
                headers: { Authorization: `Bearer ${cookies["auth"]}` }
            })
            .then((resp) => {
                setOfferList(resp.data.offers)
            });

    }, []) 

    function returnOfferIcon(type){
        if (type === "BUY"){
            return (
                <img
                className = ''
                id='loading'
                src='/buy_cart.png'
                alt='loading buy cart'
                style={{width: 30}}
                height='auto'
              />
            )
        } else if (type === "SELL"){
            return (
                <img
                className = "mx-auto d-block"
                id="loading"
                src="/sell_cart.png"
                alt="loading sell cart"
                style={{width: 30}}
                height="auto"
                display= 'block'
              />
            )
        }
    }
    
    return(
        <div className="m-3 border border-info">
            <Card>
                <Card.Body>
                    <BootstrapTable bootstrap4 keyField="id" data={OfferList} columns={Columns} bordered={false} striped={true} rowStyle={ {fontSize: '16px'} }/>
                </Card.Body>
            </Card>
        </div>
      )
    
} 