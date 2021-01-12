import React, {useState, useEffect} from 'react';
import axios from "axios";
import './Offers.css';
import dayjs from "dayjs";

export default function OfferTable(props){
    const [Offers, setOffers] = useState([]);
    
    useEffect(() => {
        axios
            .get(`http://localhost:8080/user/getuseraccount`)
            .then((resp) =>{
                setOffers(resp.data.offers);
            })
    }, [])

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

    return(
    <div className = "profile-card">
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
                                <td className="text-center">{object.price}</td>
                                <td className="text-center">{object.quantity}</td>
                                <td className="text-center">{object.totalValue}</td>
                                <td className="text-center align-middle">{OfferType}</td>
                                <td className="text-center">{dayjs(object.offerDate).format('YYYY MMM DD HH:mm')}</td>
                                <td className="text-center">
                                    <div className="table-data-feature">
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                            <i className="las la-edit" />
                                        </button>
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Delete">
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