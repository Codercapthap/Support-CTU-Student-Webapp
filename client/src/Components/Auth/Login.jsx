import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// component
import Header from '../Header';

// store: auth
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/reducer/authSlide';
import { useTranslation } from 'react-i18next';

// style scss
import './_style_login_register.scss';

function Login() {
   
   console.log('render Login');
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const user = useSelector(state => state.auth.current);
   const navigate = useNavigate();

   console.log('re render');
   const handleSubmit = () => {
      if (!emailValid(email) || !passwordValid(password)) {
         alert('please enter valid value!');
         return;
      }
      const data = {
         email,
         password
      };
      const action = login(data);
      dispatch(action);
      console.log(user);
      navigate('/auth/profile');
   };
   const emailValid = email => {
      let regex =
         /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(email)) {
         return true;
      } else if (email === '') {
         return false; // or more
      } else {
         return false;
      }
   };

   const passwordValid = password => {
      return true;
      // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      // if (regex.test(password)) {
      //    return true;
      // } else if (password === '') {
      //    return false; // or more
      // } else {
      //    return false;
      // }
   };

   return (
      <>
         <Header />
         <div className="auth-wrapper">
            {/* <div className="auth-title">+++ Login +++</div> */}
            <div className="auth-container">
               <div className="form-group">
                  <label className="group-name" htmlFor="email">
                     {t('header.auth.email.name')}
                  </label>
                  <br />
                  <div className="input-check-box">
                     <i className="fas fa-envelope"></i>
                     <input
                        className="input"
                        type="email"
                        placeholder={t('header.auth.email.placeholder')}
                        value={email}
                        onChange={e => {
                           const tmp = e.target.value;
                           setEmail(tmp);
                        }}
                     />
                     {emailValid(email) && (
                        <i style={{ color: 'green' }} className="fas fa-check"></i>
                     )}
                     {!emailValid(email) && (
                        <i style={{ color: 'red' }} className="fas fa-check"></i>
                     )}
                  </div>
               </div>
               <div className="form-group">
                  <label className="group-name" htmlFor="email">
                     {t('header.auth.password.name')}
                  </label>
                  <br />
                  <div className="input-check-box">
                     <i className="fas fa-key"></i>
                     <input
                        className="input"
                        type="password"
                        placeholder={t('header.auth.password.placeholder')}
                        value={password}
                        onChange={e => {
                           const tmp = e.target.value;
                           setPassword(tmp);
                        }}
                     />
                     {passwordValid(password) && (
                        <i style={{ color: 'green' }} className="fas fa-check"></i>
                     )}
                     {!passwordValid(password) && (
                        <i style={{ color: 'red' }} className="fas fa-check"></i>
                     )}
                  </div>
               </div>
               <div className="form-group">
                  <button className="form-submit-item" onClick={handleSubmit}>
                     {t('header.auth.submit.name')}
                  </button>
                  <div className="alert-box">
                     {t('header.auth.submit.login')}
                     <NavLink className="link" to="/auth/register">
                        {t('header.auth.register')}
                     </NavLink>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Login;

// regex check password
// https://helpex.vn/question/regex-cho-mat-khau-phai-chua-it-nhat-tam-ky-tu-it-nhat-mot-so-va-ca-chu-thuong-va-chu-hoa-va-ky-tu-dac-biet-5cb71aeeae03f62598de3864

// const showMessage = (message = 'error', color = 'red') => (
//    <i
//       style={{
//          fontWeight: 'bold',
//          color: `${color}`
//       }}
//    >
//       {message}
//    </i>
// );
