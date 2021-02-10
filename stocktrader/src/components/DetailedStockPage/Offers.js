import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import './Offers.css';
import dayjs from "dayjs";
import {Modal, Button, Card} from 'react-bootstrap';
import OfferForm from './OfferForm';
import EditForm from './EditForm';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import OfferModal from './OfferModal.js';
import OfferModalEdit from './OfferModal_EDIT.js';
import OfferModalDel from './OfferModal_DEL.js';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import NumberFormat from 'react-number-format'


export default function Offers(props){
    const [Offers, setOffers] = useState([]);
    const [isFormModalVisible, setisFormModalVisible] = useState(false);
    const [isEditModalVisible, setisEditModalVisible] = useState(false);
    const [Cash, setCash] = useState(0);
    const [Edited, setEdited] = useState({});
    const [Available, setAvailable] = useState(0);
    const [AccData] = useContext(MainpageAccountContext);
    const [isOfferModalVisible, setIsOfferModalVisible] = useState(false);


    const getNumberOfStocks = (symbol) => {
      AccData.stockPerformanceList.map((object) => {
        if(object.stock.symbol === symbol){
          setAvailable(object.stockTotalAmount);
        }
      })
    }

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
          
          text: <OfferModal symbol={props.symbol} type={""}/>,
          formatter: (cell, row) => <div className="d-inline-flex table-data-feature"><OfferModalEdit symbol={row.stock.symbol} type={row.offerType} quantity={row.quantity} price={row.price} id={row.id}/>
          <OfferModalDel symbol={row.stock.symbol} type={row.offerType} quantity={row.quantity} price={row.price} id={row.id}/></div>
      }
      
  ])

    useEffect(() => {
        axios
            .get(`http://localhost:8080/user/getoffers/${props.symbol}`)
            .then((resp) =>{
                setOffers(resp.data);
            }) 
    }, [props.symbol])

    function DeleteOffer(id){
        axios
            .delete(`http://localhost:8080/user/deleteoffer/${id}`);
    }

    function DecideOfferType(i){
        if(Offers[i].offerType === "BUY"){
            return(<div className="profile-card__button button--blue">Buy</div>)
        } else{
            return(<div className="profile-card__button button--orange">Sell</div>)
        }
    }

    function isSpacer(i) {
        if (Offers.length !== i && i !== 0){
            return(<tr className="spacer"></tr>)
        }
    }

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

    
    function EditModal(props){
        console.log("edited");
        /*
        return(
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit your offer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditForm available={Available} getNumber={getNumberOfStocks} id={Edited? Edited.id : 0} stock={Edited.stock? Edited.stock.symbol : ""} type={Edited? Edited.offerType : ""} quantity={Edited? Edited.quantity : 0} price={Edited? Edited.price : 0} cash={Cash}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
        */
    }
    

    return(
        <div className="m-3 border border-info" style={{textAlign: "center"}}>
          <Card> 
            <Card.Body>
              <BootstrapTable bootstrap4 keyField="id" data={Offers} columns={Columns} bordered={false} striped={true} rowStyle={ { fontSize: '16px' } }/>
            </Card.Body>
          </Card>
        </div>
      )
}