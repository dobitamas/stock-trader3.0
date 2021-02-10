import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../StockListPage/StockList.css';
import NewsCard from './NewsCard';
import NewsCard2 from './NewsCard2';

export default function AllNews() {
    const [Articles, setArticles] = useState([]);


    useEffect(() => { 
        GetNews();
    }, [])


    function GetNews() {
        axios
            .get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f048246f60954f18bb19c0c9f1b0b911')
            .then((resp) => setArticles(resp.data.articles));

    }
    
    
        return (
            <div className="">
                <div className="">
                    <div className="row">
                        {/*
                        {Articles.map((article, i) => {
                            return(
                                <React.Fragment>
                                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mx-auto row row-eq-height">  
                                        
                                            <NewsCard2 article={article} />
                                    </div>
                                </React.Fragment>
                                
                            )
                        })}
                    */}
                        <NewsCard2 />
                    </div>
                </div>
            </div>
             
            
        )
    
    
    
    
    
}