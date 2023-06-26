import React, { useEffect, useLayoutEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, memo } from 'react';

import { varCSS } from '../../Common/js/vanillaJs';
import './_style.scss';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../store/reducer/authSlide';

// https://viblo.asia/p/gioi-thieu-ve-momentjs-63vKjnwAK2R
// https://viblo.asia/p/tai-sao-khong-nen-dung-momentjs-1Je5EeBj5nL

// const styleActiveLink = ({ isActive }) =>
//    isActive
//       ? {
//            color: 'var(--heading-color)',
//            background: 'var(--text-color)'
//         }
//       : {
//            color: 'var(--text-color)',
//            background: 'var(--bg-color)'
//         };

function Header() {
   // console.log('render Header');
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector(state => state.auth.current);
   // console.log(user.role);
   const timezone = useSelector(state => state.config.area);

   const [showNavbar, setShowNavbar] = useState(false);
   const [clock, setClock] = useState(
      new Date().toLocaleTimeString('en-US', {
         timeZone: timezone
      })
   );
   const [showAlert, setShowAlert] = useState(false);

   useLayoutEffect(() => {
      const navbarWidth = varCSS('navbar-width');
      if (navbarWidth === '200px') {
         setShowNavbar(true);
      }
   }, []);

   useEffect(() => {
      const showCurentTimeZones = tz => {
         let date = new Date();
         let strTime = date.toLocaleTimeString('en-US', {
            timeZone: tz
         });
         setClock(strTime);
      };
      let t = setInterval(function () {
         showCurentTimeZones(timezone);
      }, 1000);
      return () => {
         clearInterval(t);
      };
   }, [timezone]);

   useEffect(() => {
      const header = document.querySelector('.header');
      const handleScroll = () => {
         if (window.scrollY > 0 && !header.classList.contains('fixed-header')) {
            header.classList.add('fixed-header');
         } else if (window.scrollY <= 0) {
            header.classList.remove('fixed-header');
         }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const handleShowNavbar = () => {
      setShowNavbar(!showNavbar);
      if (showNavbar) {
         varCSS('navbar-width', '0px');
      } else if (!showNavbar) {
         varCSS('navbar-width', '200px');
      }
   };

   const handleLogout = () => {
      dispatch(logout());
      navigate('/auth/login');
   };

   const handleShowAlertBox = () => {
      setShowAlert(!showAlert);
   };

   return (
      <ul className="header">
         <li className="header-item bars" onClick={handleShowNavbar}>
            {showNavbar && <i className="fa-solid fa-arrow-left-long"></i>}
            {!showNavbar && <i className="fa-solid fa-arrow-right-long"></i>}
         </li>
         <li className="header-item">
            <div>{clock}</div>
         </li>
         <li className="header-item">
            <input type="text" name="search" placeholder="search..." />
            <i className="fa-solid fa-magnifying-glass"></i>
         </li>

         <li className="header-item">
            <i className="fa-solid fa-bell" onClick={handleShowAlertBox}></i>
            <span className="count-box">
               <span className="count">1</span>
            </span>
            {showAlert && (
               <div className="alert-container-box">
                  <div className="alert-item">
                     <div className="alert-icon-box">
                        <i className="fa-solid fa-bell"></i>
                     </div>
                     <div className="alert-content-box">
                        <div className="alert-content">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                     </div>
                  </div>
                  <div className="alert-item">
                     <div className="alert-icon-box">
                        <i className="fa-solid fa-bell"></i>
                     </div>
                     <div className="alert-content-box">
                        <div className="alert-content">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                     </div>
                  </div>
                  <div className="alert-item">
                     <div className="alert-icon-box">
                        <i className="fa-solid fa-bell"></i>
                     </div>
                     <div className="alert-content-box">
                        <div className="alert-content">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                     </div>
                  </div>
                  <div className="alert-item">
                     <div className="alert-icon-box">
                        <i className="fa-solid fa-bell"></i>
                     </div>
                     <div className="alert-content-box">
                        <div className="alert-content">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </li>

         <li className="header-item">
            <NavLink
               to={user.role === 'passersby' ? '/auth/login' : '/auth/profile'}
               title="Profile"
               className="auth-item"
            >
               <img className="avatar-image" src={user.avatar_url} alt="avatar" />
            </NavLink>
         </li>

         {user.role !== 'passersby' && (
            <li className="header-item" onClick={handleLogout} title="Log out">
               <i className="fa-solid fa-right-from-bracket"></i>
            </li>
         )}
      </ul>
   );
}

export default memo(Header);
