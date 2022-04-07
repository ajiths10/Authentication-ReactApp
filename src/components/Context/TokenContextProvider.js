import React , { useState, useEffect } from "react";
import TokenContext from "./Context-Token";

const TokenContextProvider = (props) => {
const [TokenState , UpdateToken] = useState('');
const [tokenisValid, setTokenValid] = useState(false);

const setTokenHandler=(data)=>{
    UpdateToken(data); 
    setTokenValid(false);      
};

const checker = ()=>{
    const localData = localStorage.getItem('JWTTOKEN')

    if(localData==null){
        setTokenValid(false);
    }else if(localData.trim()==''){
        setTokenValid(false);
    }else{
        setTokenValid(true);
    }
}
useEffect(checker,[])

const loginStateHandle=()=>{
    setTokenValid(true);
}


    const contextHandler= {
        token : TokenState,
        tokenHandler: setTokenHandler,
        loginHandler:loginStateHandle,
        tokenValid: tokenisValid,
    };

    return <TokenContext.Provider value={contextHandler} >{props.children}</TokenContext.Provider>
};


export default TokenContextProvider;