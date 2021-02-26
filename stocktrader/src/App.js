import './App.css';
import React, {useEffect, useContext} from 'react'
import {Helmet} from 'react-helmet';
/*import '../node_modules/bootstrap/dist/css/bootstrap.css';*/
import '../src/scss/custom.scss';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Mainpage from './components/MainPage/Mainpage';
import Detailedstockpage from './components/DetailedStockPage/Detailedstockpage';
import StockList from './components/StockListPage/StockList';
import AllNews from './components/NewsPage/AllNews';
import SpecificNews from './components/NewsPage/SpecificNews';
import LoginOrRegister from './components/LoginRegister/LoginOrRegister'
import LoggedInContext from './context/LoggedInContext.js';
import { useCookies } from "react-cookie";


function App() {
  //const [IsLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const feather = require('feather-icons');
    feather.replace();
}, [])

  function removeCookies() {
    removeCookie("auth");
    removeCookie("username");
    removeCookie("roles");
  }

  return (
    <div className="App" style={{backgroundColor: "#f4f7fa"}}>
            <Helmet>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content="" />
            <meta name="author" content="" />
            </Helmet>
        <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">Stock Trader</a>
      <input className="form-control form-control-dark w-50" type="text" placeholder="Search" aria-label="Search"/>
      <ul className="navbar-nav px-3">
        {cookies["username"]? <div><a className="nav-link" style={{display: 'inline-block'}}>{`Hello ${cookies["username"]}`}</a> <a className="nav-link" onClick={_ => removeCookies()} style={{display: 'inline-block'}}>Logout</a> </div>: <a className="nav-link">GUEST</a> }
        <li className="nav-item text-nowrap">
        </li> 
      </ul>
    </nav>

    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky mt-5" style={{position: "fixed"}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  <span data-feather="home"></span>
                  StockList
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dashboard" >
                  <span data-feather="file" ></span> 
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/news">
                  <span data-feather="bar-chart-2"></span>
                  News
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login-register">
                  <span data-feather="bar-chart-2"></span>
                  Login/Register
                </a>
              </li>
            </ul>
          {/*
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Saved reports</span>
              <a className="d-flex align-items-center text-muted" >
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <a className="nav-link" >
                  <span data-feather="file-text"></span>
                  Current month
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >
                  <span data-feather="file-text"></span>
                  Last quarter
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >
                  <span data-feather="file-text"></span>
                  Social engagement
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >
                  <span data-feather="file-text"></span>
                  Year-end sale
                </a>
              </li>
            </ul>
          */}
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            {/*
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
                <button className="btn btn-sm btn-outline-secondary">Share</button>
                <button className="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar"></span>
                This week
              </button>
            </div>
            */}
          </div>
          <Router>
            <div className="my-4 w-100" width="900" height="380">
              <Route exact path="/">
                <StockList />
              </Route>
              <Route exact path="/stockpage/:symbol" component={Symbol}>
                <Detailedstockpage symbol={Symbol} />
              </Route>
              <Route exact path="/dashboard">
                <Mainpage />
              </Route>
              <Route exact path="/news">
                <AllNews />
              </Route>
              <Route exact path="/news/:symbol" component={Symbol}>
                <SpecificNews symbol={Symbol} />
              </Route>
              <Route exact path="/login-register">
                <LoginOrRegister />
              </Route>
            </div>
          </Router>
          {/* <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}

          
        </main>
      </div>
    </div>
    <Helmet>
    <script src="../../assets/js/vendor/popper.min.js" rel="text/javascript"></script>
    </Helmet>
    </div> 
  );
}
 
export default App;
