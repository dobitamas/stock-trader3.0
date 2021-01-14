import React, {createContext,useState, useEffect} from 'react';
import axios from "axios";


export const MainpageAccountContext = createContext();


export const MainpageAccountProvider = (props) => {
    const [AccData, setAccData] = useState({
      "id": 8,
      "username": "Mr.T",
      "cash": 1007193.6,
      "cashInvested": 1000000.0,
      "portfolio": [
        {
          "id": 4017,
          "stock": {
            "id": 1,
            "name": "Apple",
            "symbol": "AAPL"
          },
          "purchasePrice": 128.8,
          "quantity": 100,
          "purchaseDate": "2021-01-13T10:35:08.620+00:00"
        },
        {
          "id": 3998,
          "stock": {
            "id": 1,
            "name": "Apple",
            "symbol": "AAPL"
          },
          "purchasePrice": 128.8,
          "quantity": 42,
          "purchaseDate": "2021-01-13T08:41:45.243+00:00"
        },
        {
          "id": 11,
          "stock": {
            "id": 1,
            "name": "Apple",
            "symbol": "AAPL"
          },
          "purchasePrice": 170.23,
          "quantity": 200,
          "purchaseDate": "2021-01-13T08:41:34.240+00:00"
        },
        {
          "id": 10,
          "stock": {
            "id": 1,
            "name": "Apple",
            "symbol": "AAPL"
          },
          "purchasePrice": 150.23,
          "quantity": 100,
          "purchaseDate": "2021-01-13T08:41:34.240+00:00"
        }
      ],
      "offers": [
        
      ],
      "stockPerformanceList": [
        {
          "id": 4042,
          "stock": {
            "id": 1,
            "name": "Apple",
            "symbol": "AAPL"
          },
          "stockTotalAmount": 442,
          "averagePurchasePrice": 152.4,
          "totalPurchaseValue": 67358.6,
          "stockCurrentPrice": 128.8,
          "stockCurrentValue": 56929.6,
          "stockValueChange": -0.15
        }
      ],
      "portfolioPerformance": {
        "id": 9,
        "portfolioTotalValue": 1064123.2,
        "portfolioTotalStockValue": 56929.6,
        "percentageStockValue": 5.35,
        "percentageCashValue": 94.65,
        "currentStockProfit": -10429.0,
        "investedCashProfit": 64123.2,
        "percentageCurrentStockProfit": -18.32,
        "percentageInvestedCashProfit": 6.41
      }
    });
    
      useEffect(() => {
        axios
          .get('http://localhost:8080/user/getuseraccount')
          .then((resp) => setAccData(resp.data));
      }, [])

      return(
            <MainpageAccountContext.Provider value={[AccData, setAccData]} >
                {props.children}
            </MainpageAccountContext.Provider>
        );
  
}  