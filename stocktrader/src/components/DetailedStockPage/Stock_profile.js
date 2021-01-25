import React,{useState, useEffect} from 'react';
import axios from "axios";
import DayJS from "react-dayjs";
import dayjs from 'dayjs';
export default function StockProfile(props){
  const [StockData, setStockData] = useState({});

  useEffect(() => {
    axios 
      .get(`http://localhost:8080/stock/getstock/${props.stock}`)
      .then((resp) =>{ 
          setStockData(resp.data)
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

                    
                    <div className="profile-card-ctr">
                      <button className="profile-card__button button--blue js-message-btn">BUY</button>
                      <button className="profile-card__button button--orange">SELL</button>
                    </div>
                  </div>
                </div>
              
            </div>
          );

}