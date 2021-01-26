import React, {useState, useEffect} from 'react';

import {Row, Col, Card, Table} from 'react-bootstrap';
import axios from 'axios';

export default function StocksTable(){
    const [StockList, setStockList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/user/getStockPerformanceList")
            .then((resp) => setStockList(resp.data));

    }, [])


    
    return(
        <div className="m-3 border border-info">
                            <Card>
                                <Card.Body>
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th>Avg price</th>
                                            <th>Purch value</th>
                                            <th>Current price</th>
                                            <th>Current value</th>
                                            <th>Value change</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                    {StockList.map( (object, i) => {
                        return(
                            <React.Fragment key={i}>
                                <tr className="tr-shadow">
                                    <a href={`/stockpage/${object.stock.symbol}`}>
                                        <td className="text-center">{object.stock.name}</td>
                                    </a>
                                    <td className="text-center">{object.stockTotalAmount}</td>
                                    <td className="text-center">{`$ ${object.averagePurchasePrice}`}</td>
                                    <td className="text-center">{`$ ${object.totalPurchaseValue}`}</td>
                                    <td className="text-center">{`$ ${object.stockCurrentPrice}`}</td>
                                    <td className="text-center">{`$ ${object.stockCurrentValue}`}</td>
                                    <td className="text-center">{` ${object.stockValueChange} %`}</td>
                                </tr>    
                            </React.Fragment>
                            )
                    })}
                    
                </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
        </div>
      )
    
}