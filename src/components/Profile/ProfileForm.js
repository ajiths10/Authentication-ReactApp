import React, { useState , useContext , useRef } from 'react';
import { useHistory } from 'react-router-dom';

import TokenContext from '../Context/Context-Token';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const CTX = useContext(TokenContext);
  const resetPassWordRef = useRef();
  const [btnValue, setBtnValue] = useState('Change Password')
  const tokenData = CTX.token;
  
  const changePasswordHandler = async(event)=>{
    event.preventDefault();
    const refPasswordValue = resetPassWordRef.current.value;
    console.log(CTX.tokenValid);

    if(CTX.tokenValid){
      setBtnValue('Sending...');
      try{
        await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDYvgMIyWWmOzJ3IXis-uRWEguL3xNOPww",
        {
          method: "POST",
          body: JSON.stringify({
                  idToken: tokenData,
                  password: refPasswordValue,
                  returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
        )
        console.log('Request send sucessfully');
        history.replace('/');
      }catch(err){ 
        console.log('Something went wrong');
        alert(err.error.message)}
    }
    setBtnValue('Change Password');
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={resetPassWordRef}/>
      </div>
      <div className={classes.action}>
        <button onClick={changePasswordHandler} >{btnValue}</button>
      </div>
    </form>
  );
}

export default ProfileForm;
