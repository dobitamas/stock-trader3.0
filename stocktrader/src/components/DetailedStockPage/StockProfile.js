import React,{useState, useEffect} from 'react';
import axios from "axios";
import DayJS from "react-dayjs";
import dayjs from 'dayjs';
import {Modal, Button} from 'react-bootstrap';
import OfferForm from '../DetailedStockPage/OfferForm';
import OfferModalBuy from './OfferModal_BUY.js';
import OfferModalSell from './OfferModal_SELL.js';

export default function StockProfile(props){
  const [StockData, setStockData] = useState({});
  const [StockList, setStockList] = useState([]);
  const [Type, setType] = useState("");
  const [isFormModalVisible, setisFormModalVisible] = useState(false);


  useEffect(() => {
    axios 
      .get(`http://localhost:8762/stock/getstock/${props.symbol}`)
      .then((resp) =>{
          setStockData(resp.data)
          setStockList(StockList => [...StockList, props.symbol])
        })
  }, [])


    return(
            <div>
                <div className="">
                  <div className="profile-card__img">
                    <img src={StockData.logo} alt="profile card" />
                  </div>
                  <div className="profile-card__cnt js-profile-cnt">
                    <div className="profile-card__name">{StockData.name}</div>
                    <div className="profile-card__txt">
                        <strong>{StockData.industry} </strong>
                        from
                        <strong> {StockData.country}</strong>
                    </div>
                    <div className="profile-card__txt">
                        <a href={StockData.weburl} target="_blank" rel="noopener noreferrer">{StockData.weburl}</a>
                    </div>
                    <div className="profile-card__txt">
                        Exchange: {StockData.exchange}
                    </div>
                    <div className="profile-card__txt">
                        IPO: { dayjs(StockData.ipo).format('DD/MM/YYYY')}
                    </div>

                    <div className="profile-card-loc">
                      <span className="profile-card-loc__txt">
                        {StockData.nickName} 
                      </span>
                    </div>

                    {/*profile-card-ctr*/}
                    <div className="d-flex justify-content-center container">
                      <div className="row">
                        <div className="col-sm">
                          <OfferModalBuy symbol={props.symbol} type={""}/>
                        </div>
                        <div className="col-sm">
                          <OfferModalSell symbol={props.symbol} type={""}/>
                        </div>
                    </div>
                      </div>
                      
                  </div>
                </div>
              
            </div>
          );

}