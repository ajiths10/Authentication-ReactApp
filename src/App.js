import { useContext } from 'react';
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
