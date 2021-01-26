import React,{useState, useEffect} from 'react';
import axios from "axios";
import DayJS from "react-dayjs";
import dayjs from 'dayjs';
import {Modal, Button} from 'react-bootstrap';
import OfferForm from '../DetailedStockPage/Form';

export default function StockProfile(props){
  const [StockData, setStockData] = useState({});
  const [Cash, setCash] = useState(0);
  const [Available, setAvailable] = useState(0);
  const [AccData, setAccData] = useState({});
  const [isFormModalVisible, setisFormModalVisible] = useState(false);


  useEffect(() => {
    axios 
      .get(`http://localhost:8080/stock/getstock/${props.stock}`)
      .then((resp) =>{ 
          setStockData(resp.data)
        })

    axios
        .get('http://localhost:8080/user/getuseraccount')
        .then((resp) => {
          setAccData(resp.data)
          setCash(resp.data.cash)
        });
      
  }, [])

  const getNumberOfStocks = (symbol) => {
    AccData.stockPerformanceList.map((object) => {
      if(object.stock.symbol === symbol){
        setAvailable(object.stockTotalAmount);
      }
    })
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
                <OfferForm cash={Cash} available={Available} getNumber={getNumberOfStocks} />
              </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

    return(
            <div>
              <OfferModal 
                show={isFormModalVisible}
                onHide={() => setisFormModalVisible(false)}
                />
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
                          <button className="profile-card__button button--blue" onClick={_ => showFormModal}>BUY</button>
                        </div>
                        <div className="col-sm">
                          <button className="profile-card__button button--orange">SELL</button>
                        </div>
                    </div>
                      </div>
                      
                  </div>
                </div>
              
            </div>
          );

}