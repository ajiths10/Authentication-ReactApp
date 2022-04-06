import React , { useState, useEffect } from "react";
import TokenContext from "./Context-Token";

const TokenContextProvider = (props) => {
const [TokenState , UpdateToken] = useState('');
const [tokenisValid, setTokenValid] = useState(false);

const setTokenHandler=(data)=>{
    console.log(data);
    UpdateToken(data);       
};

const checker = ()=>{
    if(TokenState.trim() !==''){
        setTokenValid(true);
    }else{
        setTokenValid(false);
    }
}
useEffect(checker,[TokenState])

    const contextHandler= {
        token : TokenState,
        tokenHandler: setTokenHandler,
        tokenValid: tokenisValid,
    };

    return <TokenContext.Provider value={contextHandler} >{props.children}</TokenContext.Provider>
};


export default TokenContextProvider;