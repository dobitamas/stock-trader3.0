import React from "react";
import '../MainPage/StatsCard.css';
import {Helmet} from 'react-helmet';


export default function StatsCard(props) {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>
          <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap-extended.min.css"></link>
          <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css"></link>
          <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" />
          {/*<link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/colors.min.css"></link>/*}
          {/*<link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap.min.css"></link>*/}
          <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
        </Helmet>       
        
        <div className="card shell bg-gradient-info">
          <div className="card-content">
            <div className="card-body py-0">
              <div className="media d-flex align-items-center mx-2">
                <div className="align-self-center">
                  {/*<i className="icon-speech warning font-large-2 float-left"></i>*/}
                  <i className= {`${props.icon}`}></i>
                </div>
                <div className="media-body text-right">
                  <h2>{props.amount}</h2> 
                  <h4>{props.label}</h4>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
      
    )
}
