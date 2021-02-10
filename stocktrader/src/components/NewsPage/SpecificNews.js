import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom';


export default function SpecificNews() {
    let {symbol} = useParams();

    useEffect(() => {
        console.log(symbol)
    })
    if(symbol){
        return(
            <div>
                <h1>Szia {symbol}</h1>
            </div>
            )
    } else if(!symbol){
        return(
            <div>
                <h1>Szia! Nincs symbol!</h1>
            </div>
        )
    }
}
