import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";


export default function StocksTable(){
    const [StockList, setStockList] = useState([]);
    const [Columns, setColumns] = useState([
      {
        dataField: "stock.name",
        text: "Name",
        sort: true,
        formatter: (cell, row) => <a href={`/stockpage/${row.stock.symbol}`}> {cell} </a>

      },
      {
        dataField: "stockTotalAmount",
        text: "Amount",
        sort: true,
        formatter: (cell, row) => <NumberFormat value={cell} displayType={'text'} thousandSeparator={" "} decimalScale={2}/>
      },
      {
        dataField: "averagePurchasePrice",
        text: "Avg Price",
        sort: true,
        formatter: (cell, row) => <NumberFormat value={cell} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>
      },
      {
        dataField: "stockCurrentPrice",
        text: "Current Price", 
        sort: true,
        formatter: (cell, row) => <NumberFormat value={cell} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>
      },
      {
        dataField: "totalPurchaseValue",
        text: "Purch Value",
        sort: true,
        formatter: (cell, row) => <NumberFormat value={cell} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>
      },
      {
        dataField: "stockCurrentValue",
        text: "Current Value",
        sort: true,
        formatter: (cell, row) => <NumberFormat value={cell} displayType={'text'} thousandSeparator={" "} decimalScale={2} prefix={"$ "}/>
      },
      {
        dataField: "stockValueChange",
        text: "Value change",
        sort: true,
        formatter: (cell, row) => <NumberFormat value={cell*100} displayType={'text'} thousandSeparator={" "} decimalScale={2} suffix={" %"}/>
      }
    ])

     

    useEffect(() => {
      getPortfolioPerformanceList()
      setInterval(() => {
          getPortfolioPerformanceList()
      }, 10000)
    }, [])

    function getPortfolioPerformanceList(){
      axios
            .get("http://localhost:8080/user/getStockPerformanceList")
            .then((resp) => setStockList(resp.data));
    }
    
    return(
        <div className="m-3 border border-info">          
            <Card>
                <Card.Body>
                    <BootstrapTable bootstrap4 keyField="id" data={StockList} columns={Columns} bordered={false} striped={true} rowStyle={ { fontSize: '16px' } }/>
                </Card.Body>
            </Card>
        </div>

    )


    
        
      
    
}