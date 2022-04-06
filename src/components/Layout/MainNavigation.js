import { useContext } from 'react';
 import { Link, useHistory } from 'react-router-dom';

import TokenContext from '../Context/Context-Token';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const tokenCTX = useContext(TokenContext);
  const checkCTX  =tokenCTX.tokenValid;
  const history = useHistory();

  const LogoutBtnHandler = (event) => {
    event.preventDefault();
     tokenCTX.tokenHandler('');
     history.replace('/auth');
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
           {!checkCTX && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            { checkCTX && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {checkCTX && <button onClick={LogoutBtnHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
