import React,{useState, useEffect} from 'react';
import './Profile.scss';
import axios from "axios";
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format'

export default function Profile(props){
  const [ProfileData, setProfileData] = useState({});

  useEffect(() => {
    axios 
      .get(`http://localhost:8762/user/getprofilecardinfo`)
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
                    <div className="profile-card-loc">{ProfileData.nickName}</div>
                    <div className="profile-card-inf">
                      <div className="profile-card-inf__item">
                        <div className="profile-card-inf__title">{<NumberFormat value={props.totalPortfolioValue} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={'$ '}/>} </div>
                        <div className="profile-card-inf__txt">Total portfolio value</div>
                      </div>
                      <div className="profile-card-inf__item">
                        <div className="profile-card-inf__title">{<NumberFormat value={props.investedCash} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={'$ '}/>}</div>
                        <div className="profile-card-inf__txt">Cash invested</div>
                      </div>
                    </div>
                    
                  </div>
                </div>
            </div>
          );

}