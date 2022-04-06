import { useState, useRef , useContext } from "react";
import { useHistory } from "react-router-dom";

import TokenContext from "../Context/Context-Token";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const tokenValue = useContext(TokenContext);
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      setLoading(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYvgMIyWWmOzJ3IXis-uRWEguL3xNOPww",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          setLoading(false);
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          res.json().then((data) => {
            console.log(data.idToken);
            tokenValue.tokenHandler(data.idToken);
            history.replace('/'); //redirecting the page when user sucessfully logged in.
            //
          });
        } else {
          res.json().then((data) => {
            //show an error model
            setLoading(false);
            console.log(data.error.message);
            alert(data.error.message);
          });
        }
      });
    } else {
      setLoading(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYvgMIyWWmOzJ3IXis-uRWEguL3xNOPww",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          setLoading(false);
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
        } else {
          res.json().then((data) => {
            //show an error model
            setLoading(false);
            console.log(data.error.message);
            alert(data.error.message);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && (
            <label className={classes.labelClass}>Sending request...</label>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
