import React,{useState, useEffect} from 'react';
import './Profile.scss';
import axios from "axios";

export default function Profile(props){
  const [ProfileData, setProfileData] = useState({});

  useEffect(() => {
    axios 
      .get(`http://localhost:8080/user/getprofilecardinfo`)
      .then((resp) => setProfileData(resp.data));
  }, [])

    return(
            <div>
                <div className="">
                  <div className="profile-card__img">
                    <img src={ProfileData.profilePic} alt="profile card" />
                  </div>
                  <div className="profile-card__cnt js-profile-cnt">
                    <div className="profile-card__name">{ProfileData.username}</div>
                    <div className="profile-card-loc">
                        {ProfileData.nickName} 
                    </div>
                    <div className="profile-card-inf">
                      <div className="profile-card-inf__item">
                        <div className="profile-card-inf__title">{`$ ${ProfileData.cash}`}</div>
                        <div className="profile-card-inf__txt">Cash</div>
                      </div>
                      <div className="profile-card-inf__item">
                        <div className="profile-card-inf__title">{`$ ${ProfileData.cashInvested}`}</div>
                        <div className="profile-card-inf__txt">Cash invested</div>
                      </div>
                      <div className="profile-card-inf__item">
                        <div className="profile-card-inf__title">{ProfileData.numberOfOffers}</div>
                        <div className="profile-card-inf__txt">Number of offers</div>
                      </div>
                    </div>
                    <div className="profile-card-ctr">
                      <button className="profile-card__button button--blue js-message-btn">Stocks</button>
                      <button className="profile-card__button button--orange">Stocks</button>
                    </div>
                  </div>
                </div>
            </div>
          );

}