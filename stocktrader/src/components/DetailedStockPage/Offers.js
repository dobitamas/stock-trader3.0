import React, {useState, useEffect} from 'react';
import axios from "axios";
import './Offers.css';

export default function OfferTable(props){
    const [Offers, setOffers] = useState([]);
    
    useEffect(() => {
        axios
            .get(`http://localhost:8080/user/getuseraccount`)
            .then((resp) =>{
                setOffers(resp.data.offers);
            })
    }, [])

    return(
    <div>
        <div className="table-responsive table-responsive-data2">
          <table className="table table-data2">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total value</th>
                <th>Offer type</th>
                <th>Offer date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {Offers.map(function(object) {
                    return(
                        <React.Fragment>
                            <tr className="tr-shadow">
                                <td>{object.id}</td>
                                <td>
                                    <span className="block-email">{object.stock.name}</span>
                                </td>
                                <td className="desc">{object.price}</td>
                                <td>{object.quantity}</td>
                                <td>
                                    <span className="status--process">{`$ ${object.totalValue}`}</span>
                                </td>
                                <td>{object.offerType}</td>
                                <td>{object.offerDate}</td>
                                <td>
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
                            <tr className="spacer"></tr>
                        </React.Fragment>)
                })}
                
            </tbody>
          </table>
        </div>
      </div>
      )
}