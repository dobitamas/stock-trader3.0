import React, {createContext,useState, useEffect} from 'react';

export const MainpageAccountContext = createContext();


export const MainpageAccountProvider = (props) => {
    const [AccData, setAccData] = useState({
        "id": 8,
        "username": "Mr.T",
        "cash": 994497.58,
        "cashInvested": 1000000.0,
        "portfolio": [
          {
            "id": 23,
            "stock": {
              "id": 1,
              "name": "Apple",
              "symbol": "AAPL"
            },
            "purchasePrice": 131.01,
            "quantity": 42,
            "purchaseDate": "2021-01-06T10:34:39.616+00:00"
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
            "purchaseDate": "2021-01-06T10:34:39.122+00:00"
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
            "purchaseDate": "2021-01-06T10:34:39.122+00:00"
          },
          {
            "id": 12,
            "stock": {
              "id": 2,
              "name": "Tesla Inc.",
              "symbol": "TSLA"
            },
            "purchasePrice": 250.44,
            "quantity": 30,
            "purchaseDate": "2021-01-06T10:34:39.124+00:00"
          }
        ],
        "offers": [
          {
            "id": 14,
            "stock": {
              "id": 1,
              "name": "Apple",
              "symbol": "AAPL"
            },
            "price": 70.2,
            "quantity": 102,
            "totalValue": 7160.4,
            "offerType": "BUY",
            "offerDate": "2021-01-06T10:34:39.168+00:00"
          },
          {
            "id": 15,
            "stock": {
              "id": 2,
              "name": "Tesla Inc.",
              "symbol": "TSLA"
            },
            "price": 510.2,
            "quantity": 15,
            "totalValue": 7653.0,
            "offerType": "BUY",
            "offerDate": "2021-01-06T10:34:39.168+00:00"
          }
        ],
        "stockPerformanceList": [
          {
            "id": 1524,
            "stock": {
              "id": 2,
              "name": "Tesla Inc.",
              "symbol": "TSLA"
            },
            "stockTotalAmount": 30,
            "averagePurchasePrice": 250.44,
            "totalPurchaseValue": 7513.2,
            "stockCurrentPrice": 735.11,
            "stockCurrentValue": 22053.3,
            "stockValueChange": 1.94
          },
          {
            "id": 1525,
            "stock": {
              "id": 1,
              "name": "Apple",
              "symbol": "AAPL"
            },
            "stockTotalAmount": 342,
            "averagePurchasePrice": 159.57,
            "totalPurchaseValue": 54571.42,
            "stockCurrentPrice": 131.01,
            "stockCurrentValue": 44805.42,
            "stockValueChange": -0.18
          }
        ],
        "portfolioPerformance": {
          "id": 9,
          "portfolioTotalValue": 1061356.3,
          "portfolioTotalStockValue": 66858.72,
          "percentageStockValue": 6.3,
          "percentageCashValue": 93.7,
          "currentStockProfit": 4774.1,
          "investedCashProfit": 61356.3,
          "percentageCurrentStockProfit": 7.14,
          "percentageInvestedCashProfit": 6.14
        }
      });
    

      return(
            <MainpageAccountContext.Provider value={[AccData, setAccData]} >
                {props.children}
            </MainpageAccountContext.Provider>
        );
  
} 