import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../StockListPage/StockList.css';
import StatsCard from '../MainPage/StatsCard';
import AreaChart from './AreaChart.js';
import { Link } from 'react-router-dom';
import SearchField from "react-search-field";
import InputRange from 'react-input-range';

export default function StockList() {
    const [AllStockData, setAllStockData] = useState([]);
    const [SearchWord, setSearchWord] = useState("");
    const [OriginalStocksData, setOriginalStocksData] = useState([]);
    const [Range, setRange] = useState({min: 0, max: 100});

    function getAllStockData() {
        axios
            .get(`http://localhost:8080/stock/getStockListData`)
            .then((resp) => {
                console.log(resp.data);
                setAllStockData(resp.data);
                setOriginalStocksData(resp.data);
            }
            );
    }

    useEffect(() => {
        getAllStockData();
    }, [])

    useEffect(() => {
        let NewStockData = [];
        OriginalStocksData.map((stock) => {
            if(stock.stock.name.includes(SearchWord) && stock.stock.symbol.includes(SearchWord)){
                NewStockData.push(stock);
            }
        })

        setAllStockData(NewStockData);
    }, [SearchWord])

    //Search miatt van hogy AllStockData hossza 0 ezért re-render-el
    if (!AllStockData) {
        return (
            <div>
                <img
                  className = "mx-auto d-block"
                  id="loading"
                  src="/candle_loader.gif"
                  alt="loading candle chart"
                  width="70%"
                  height="auto"
                />
            </div>
        );
      } else {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <SearchField
                        placeholder="Search..."
                        onChange={e => setSearchWord(e)}
                        classNames="test-class"
                    />
                </div>
                <div className="col">
                    
                </div>
            </div>
            <div className="row">
            {AllStockData.map((symbol) => {
                return( 
                    <React.Fragment>                     
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mx-auto row row-eq-height">  
                            <div class="card">
                                <div class="card-body text-center ">
                                    <Link to={`/stockpage/${symbol.stock.symbol}`}>
                                        <p><img class="img-fluid rounded-circle" src={symbol.stock.logo} alt="card"></img></p>
                                    </Link>
                                    <h4 class="card-title">{symbol.stock.name}</h4>
                                    {/* <p class="card-text">This is basic card with image on top, title, description and button.</p> */}
                                    <StatsCard 
                                        label={"Current price"}
                                        amount={symbol.currentPrice}
                                        icon={"las la-money-bill-wave float-left"}
                                        prefix={"$ "}
                                    />
                                    <StatsCard 
                                        label={"Change"}
                                        amount={symbol.priceChange}
                                        icon={"las la-money-bill-wave float-left"}
                                        suffix={"%"}
                                    />
                                    <AreaChart series={symbol.historicalPrices} dates={symbol.dates}/>
                                    <a href={`http://localhost:3000/stockpage/${symbol.stock.symbol}`} class="btn btn-primary btn-sm"><i class="fa fa-line-chart">  DETAILS</i></a>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
            </div> 
        </div>
        
        
    )
    }
}