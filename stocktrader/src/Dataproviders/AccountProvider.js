import React, {createContext,useState, useEffect} from 'react';
import axios from "axios";


export const MainpageAccountContext = createContext();


export const MainpageAccountProvider = (props) => {
    const [AccData, setAccData] = useState({});
    
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