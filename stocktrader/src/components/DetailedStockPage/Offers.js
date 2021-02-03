import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import './Offers.css';
import dayjs from "dayjs";
import {Modal, Button} from 'react-bootstrap';
import OfferForm from './OfferForm';
import EditForm from './EditForm';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import OfferModal from './OfferModal.js';


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
    <div className = "profile-card">
        <div className="table-responsive table-responsive-data2 mx-auto">
          <table className="table table-data2">
            <thead>
              <tr style={{textAlign:"center"}}>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Total value</th>
                <th>Price</th>
                <th>Offer type</th>
                <th>Offer date</th>
                <th><OfferModal /></th>
              </tr>
            </thead>
            <tbody>
                {Offers.map( (object, i) => {
                    let OfferType = DecideOfferType(i);
                    return(
                        <React.Fragment>
                            {isSpacer(i)}
                            <tr className="tr-shadow">
                                <td className="text-center">{object.id}</td>
                                <td className="text-center">{object.stock.name}</td>
                                <td className="text-center">{object.quantity}</td>
                                <td className="text-center">{`$ ${object.totalValue}`}</td>
                                <td className="text-center">{`$ ${object.price}`}</td>
                                <td className="text-center align-middle">{OfferType}</td>
                                <td className="text-center">{dayjs(object.offerDate).format('YYYY MMM DD HH:mm')}</td>
                                <td className="text-center">
                                    <div className="table-data-feature">
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Edit" onClick={_ => EditModal(object)}>
                                            <i className="las la-edit" />
                                        </button>
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Delete" onClick={_ => DeleteOffer(object.id)} type="submit">
                                            <i className="la la-trash" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>)
                })}
            </tbody>
          </table>
        </div>
      </div>
      )
}