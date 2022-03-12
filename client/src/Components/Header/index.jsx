import React, { useEffect, useLayoutEffect } from 'react';

import { NavLink } from 'react-router-dom';

import './_style.scss';
import { useState, memo } from 'react';

import { varCSS } from '../../helpers/vanillaJs.js';
const styleActiveLink = ({ isActive }) =>
   isActive
      ? {
           color: 'var(--heading-color)',
           background: 'var(--text-color)'
        }
      : {
           color: 'var(--text-color)',
           background: 'var(--bg-color)'
        };

function Navbar() {
   const [showNavbar, setShowNavbar] = useState(false);
   const [isLogin, setIsLogin] = useState(false);

   useLayoutEffect(() => {
      const navbarWidth = varCSS('navbar-width');
      if (navbarWidth === '200px') {
         setShowNavbar(true);
      }
   }, []);

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

   return (
      <ul className="header">
         <li className="header-item bars" onClick={handleShowNavbar}>
            {showNavbar && <i class="fa-solid fa-arrow-left-long"></i>}
            {!showNavbar && <i class="fa-solid fa-arrow-right-long"></i>}
         </li>
         <li className="header-item">
            <input type="text" name="search" />
            <i class="fa-solid fa-magnifying-glass"></i>
         </li>
         <li className="header-item">
            <i class="fa-solid fa-bell"></i>
            <span className="count-box">
               <span className="count">1</span>
            </span>
         </li>
         <li className="header-item">
            <i class="fa-solid fa-circle-user"></i>
            <div className="auth-box">
               {!isLogin && (
                  <NavLink to="/auth/login" className="auth-item" style={styleActiveLink}>
                     <i class="fa-solid fa-arrow-right-to-bracket"></i> Login
                  </NavLink>
               )}
               {!isLogin && (
                  <NavLink to="/auth/register" className="auth-item" style={styleActiveLink}>
                     <i class="fa-solid fa-registered"></i> Register
                  </NavLink>
               )}

               {isLogin && (
                  <NavLink to="/auth/logout" className="auth-item" style={styleActiveLink}>
                     <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
                  </NavLink>
               )}
            </div>
         </li>
      </ul>
   );
}

export default memo(Navbar);
