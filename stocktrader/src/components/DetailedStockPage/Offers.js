import React, {useState, useEffect} from 'react';
import axios from "axios";
import './Offers.css';
import dayjs from "dayjs";
import {Modal, Header, Title, Body, Footer, Button } from 'react-bootstrap';
import OfferForm from './Form';
import EditForm from './EditForm';

export default function OfferTable(props){
    const [Offers, setOffers] = useState([]);
    const [isFormModalVisible, setisFormModalVisible] = useState(false);
    const [isEditModalVisible, setisEditModalVisible] = useState(false);
    const [Edited, setEdited] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8080/user/getuseraccount`)
            .then((resp) =>{
                setOffers(resp.data.offers);
            })
    }, [])

    function DeleteOffer(id){
        console.log("delete offer");
        console.log(id);
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

    function showEditModal(object){
        
        setEdited(object);
        setisEditModalVisible(true);
    }

    function hideEditModal(){
        setEdited({});
        setisEditModalVisible(false);
    }

    function showFormModal(){
        setisFormModalVisible(true);
    }

    function OfferModal(props){
        return(
            <Modal
            {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Place your offer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OfferForm />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
    }

    function EditModal(props){
        console.log(Edited);
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
        <EditForm id={Edited? Edited.id : 0} stock={Edited? Edited.stock.symbol : ""} type={Edited? Edited.offerType : ""} quantity={Edited? Edited.quantity : 0} price={Edited? Edited.price : 0} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
    }

    return(
    <div className = "profile-card">
        <OfferModal 
        show={isFormModalVisible}
        onHide={() => setisFormModalVisible(false)}
        />
        
        <EditModal
        show={isEditModalVisible}
        onHide={() => hideEditModal}
        />
        
        
                                <div class="table-data__tool">
                                    <div class="table-data__tool-left">
                                    </div>
                                    <div class="table-data__tool-right">
                                        <button class="au-btn au-btn-icon au-btn--green au-btn--small" onClick={showFormModal}>
                                            <i class="zmdi zmdi-plus"></i>Add item</button>
                                    </div>
                                </div>
        <div className="table-responsive table-responsive-data2">
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
                <th></th>
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
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Edit" onClick={_ => showEditModal(object)}>
                                            <i className="las la-edit" />
                                        </button>
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Delete" onClick={_ => DeleteOffer(object.id)}>
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