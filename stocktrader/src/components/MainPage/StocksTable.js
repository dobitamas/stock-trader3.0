import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import axios from 'axios';
import NumberFormat from 'react-number-format'

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
                                            <th>Current price</th>
                                            <th>Purch value</th>
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
                                    <td className="text-center">{<NumberFormat value={object.stockTotalAmount} displayType={'text'} thousandSeparator={" "} decimalScale={2}/>}</td>
                                    <td className="text-center">{<NumberFormat value={object.averagePurchasePrice} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>}</td>
                                    <td className="text-center">{<NumberFormat value={object.stockCurrentPrice} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>}</td>
                                    <td className="text-center">{<NumberFormat value={object.totalPurchaseValue} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>}</td>
                                    <td className="text-center">{<NumberFormat value={object.stockCurrentValue} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>}</td>
                                    <td className="text-center">{<NumberFormat value={object.stockValueChange*100} displayType={'text'} thousandSeparator={" "} decimalScale={2} suffix={" %"}/>}</td>
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