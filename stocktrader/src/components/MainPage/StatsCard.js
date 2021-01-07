import React from "react";
import { Row, Col } from "react-bootstrap";
import '../MainPage/StatsCard.css';
import {Helmet} from 'react-helmet';


export default function StatsCard() {
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
        <div className="row">
        <div className="col-xl-3 col-sm-6 col-12"> 
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex">
                  <div className="align-self-center">
                    <i className="icon-pencil primary font-large-2 float-left"></i>
                  </div>
                  <div className="media-body text-right">
                    <h3>278</h3>
                    <span>New Posts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex">
                  <div className="align-self-center">
                    {/*<i className="icon-speech warning font-large-2 float-left"></i>*/}
                    <i className="las la-money-bill-wave primary font-large-2 float-left"></i>
                  </div>
                  <div className="media-body text-right">
                    <h3>156</h3>
                    <span>New Comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex"> 
                  <div className="align-self-center">
                    <i className="icon-graph success font-large-2 float-left"></i>
                  </div>
                  <div className="media-body text-right">
                    <h3>64.89 %</h3>
                    <span>Bounce Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex">
                  <div className="align-self-center">
                    <i className="icon-pointer danger font-large-2 float-left"></i>
                  </div>
                  <div className="media-body text-right">
                    <h3>423</h3>
                    <span>Total Visits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    }
