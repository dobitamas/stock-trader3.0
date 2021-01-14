import React, {useContext} from 'react';
import '../DetailedStockPage/Offers.css';
import {MainpageAccountContext} from '../../Dataproviders/AccountProvider';
import {Row, Col, Card, Table} from 'react-bootstrap';

export default function StocksTable(){
    const [AccData] = useContext(MainpageAccountContext);


    function isSpacer(i) {
        if (AccData.stockPerformanceList.length !== i && i !== 0){
            return(<tr className="spacer"></tr>)
        }
    }

    return(
    <div className = "profile-card">
        <div className="table-responsive table-responsive-data2">
          <table className="table table-data2">
            <thead>
              <tr style={{textAlign:"center"}}>
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
                            {isSpacer(i)}
                            <tr className="tr-shadow">
                                <td className="text-center">{object.stock.id}</td>
                                <td className="text-center">{object.stock.name}</td>
                                <td className="text-center">{object.stockTotalAmount}</td>
                                <td className="text-center">{`$ ${object.averagePurchasePrice}`}</td>
                                <td className="text-center">{`$ ${object.totalPurchaseValue}`}</td>
                                <td className="text-center">{`$ ${object.stockCurrentPrice}`}</td>
                                <td className="text-center">{`$ ${object.stockCurrentValue}`}</td>
                                <td className="text-center">{object.stockValueChange}</td>
                            </tr>    
                        </React.Fragment>
                        )
                })}
                
            </tbody>
          </table>
        </div>
      </div>
      )
}