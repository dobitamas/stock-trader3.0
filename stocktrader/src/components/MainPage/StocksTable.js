import React, {useContext} from 'react';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import {Row, Col, Card, Table} from 'react-bootstrap';

export default function StocksTable(){
    const [AccData] = useContext(MainpageAccountContext);

    return(
    <div className="m-3 border border-info">
                        <Card>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
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
                {AccData.stockPerformanceList.map( (object, i) => {
                    return(
                        <React.Fragment>
                            <tr className="tr-shadow">
                                <td className="text-center">{object.stock.id}</td>
                                <td className="text-center">{object.stock.name}</td>
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