import { useContext, useEffect } from 'react';
import { Switch, Route ,Redirect } from "react-router-dom";

import TokenContext from './components/Context/Context-Token';
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";


function App() {

  const tokenCTX = useContext(TokenContext);
  const checkCTX  =tokenCTX.tokenValid;
  console.log(checkCTX)
  
const localStorageCheck = ()=>{
    const locData = localStorage.getItem('JWTTOKEN');
  console.log(locData)

  if(locData.trim().length > 0){
    tokenCTX.tokenHandler(locData)
  }
}
  useEffect(localStorageCheck,[]);

  return (
      <Layout> 
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          { !checkCTX && <Route path="/auth">
            <AuthPage />
          </Route>}
          <Route path="/profile">
          {checkCTX && <UserProfile />}
          {!checkCTX  &&  <Redirect to='/auth' />}
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Layout>
  );
}

export default App;
