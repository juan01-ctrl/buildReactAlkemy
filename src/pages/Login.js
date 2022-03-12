import axios from "axios";
import React, { useState } from "react";
import loginImage from "../assets/login-img.jpg";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import Loader from "../components/Loader";

const Login = ({ setIsLogged, isDesktop, setIsDesktop }) => {
  const MySwal = withReactContent(Swal);

  const initialForm = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const reqLogin = async (email, password) => {
    // headers:{"content-type":"application/json"},body:{
    try {
      setIsLoading(true);
      const { data } = await axios.post("http://challenge-react.alkemy.org/", {
        email: email,
        password: password,
      });
      setIsLoading(false);

      if (data) {
        setIsLogged(true);
        localStorage.setItem("token-x", data.token);
        setFormData(initialForm);
        window.location.pathname = 'home' 
      }
      setIsLoading(false);
    } catch (error) {
      const err = error?.response?.data?.error;
      setIsLoading(false);

      if (err.includes("email")) {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2500);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    reqLogin(formData.email, formData.password);

    
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAlert = () => {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "the email or password entered is incorrect, try again.",
    });
  };

  return (
    <div className="login__container">
      {isLoading && (
        <div className="loader__container-login">
         <Loader/>
         </div>
      )}
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="register-form__title">Login</h1>
        <span className="line__form" />
        <input
          type="email"
          className="login__input-form"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="password"
          className="login__input-form"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        {/* {alert && <div className="alert__form"><p className="alert__form-text">The email or password is incorrect</p></div>} */}
        {alert && !isLoading && handleAlert()}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {isDesktop&&(
        <div className="img__login-container">
          <img src={loginImage} alt="login-img" className="login-img"/>
        </div>
      )}
    </div>
  );
};

export default Login;
