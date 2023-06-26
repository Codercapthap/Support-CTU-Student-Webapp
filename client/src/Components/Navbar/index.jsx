import React, { useLayoutEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

// import { varCSS } from '../../Common/js/vanillaJs';
import './_style.scss';

const styleActiveLink = ({ isActive }) =>
   isActive
      ? {
           color: 'var(--text-color)',
           background: 'var(--bg-color)'
        }
      : {
           color: 'var(--bg-color)',
           background: 'var(--primary-color)'
        };

function Navbar() {
   console.log('render Navbar');
   const { t } = useTranslation();

   useEffect(() => {
      const handleScroll = () => {
         const navbar = document.querySelector('.navbar');
         // const navW = varCSS('navbar-width');
         if (window.scrollY > 0) {
            navbar.classList.add('fixed-navbar');
         } else if (window.scrollY <= 0) {
            navbar.classList.remove('fixed-navbar');
         }
         // th navbar-width == 0px thì còn bug
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   useLayoutEffect(() => {
      let arrWrapper = document.querySelectorAll('.nav-item-wrapper');
      let arr = document.querySelectorAll('.nav-item');
      const top = 0,
         bottom = 2,
         index = 1;
      arr[top].classList.add('border-radius-top');
      arr[bottom].classList.add('border-radius-bottom');

      arrWrapper[top].classList.add('active-bg-wrapper');
      arrWrapper[index].classList.add('active-bg-wrapper');
      arrWrapper[bottom].classList.add('active-bg-wrapper');
   }, []);

   const handleSelectNavbar = index => {
      console.log(index);
      // alert(index);
      let arrWrapper = document.querySelectorAll('.nav-item-wrapper');
      arrWrapper.forEach(e => {
         if (e.classList.contains('active-bg-wrapper')) {
            e.classList.remove('active-bg-wrapper');
         }
         // e.style.backgroundColor = `var(--text-color)`;
      });
      let arr = document.querySelectorAll('.nav-item');
      arr.forEach(e => {
         if (e.classList.contains('border-radius-top')) {
            e.classList.remove('border-radius-top');
         }
         if (e.classList.contains('border-radius-bottom')) {
            e.classList.remove('border-radius-bottom');
         }
      });
      let top = index - 1,
         bottom = index + 1;
      console.log(top, bottom);
      arr[top].classList.add('border-radius-top');
      arr[bottom].classList.add('border-radius-bottom');

      arrWrapper[top].classList.add('active-bg-wrapper');
      arrWrapper[index].classList.add('active-bg-wrapper');
      arrWrapper[bottom].classList.add('active-bg-wrapper');
   };

   return (
      <nav className="navbar">
         <div className="nav-box">
            <div className="nav-item-wrapper">
               <div className="nav-item"></div>
            </div>

            <div className="nav-item-wrapper">
               <NavLink
                  to="/"
                  className="nav-item"
                  style={styleActiveLink}
                  onClick={e => handleSelectNavbar(1)}
               >
                  <i className="fa-solid fa-school"></i> {t('navbar.home')}
               </NavLink>
            </div>

            <div className="nav-item-wrapper">
               <NavLink
                  to="/forum"
                  className="nav-item"
                  style={styleActiveLink}
                  onClick={e => handleSelectNavbar(2)}
               >
                  <i className="fa-solid fa-layer-group"></i> {t('navbar.forum')}
               </NavLink>
            </div>

            <div className="nav-item-wrapper">
               <NavLink
                  to="/schedule"
                  className="nav-item"
                  style={styleActiveLink}
                  onClick={e => handleSelectNavbar(3)}
               >
                  <i class="fa-solid fa-calendar-days"></i> Schedule
               </NavLink>
            </div>

            <div className="nav-item-wrapper">
               <NavLink
                  to="/setting"
                  className="nav-item"
                  style={styleActiveLink}
                  onClick={e => handleSelectNavbar(4)}
               >
                  <i className="fa-solid fa-gear"></i> {t('navbar.setting')}
               </NavLink>
            </div>

            <div className="nav-item-wrapper">
               <NavLink
                  to="/contact"
                  className="nav-item"
                  style={styleActiveLink}
                  onClick={e => handleSelectNavbar(5)}
               >
                  <i className="fa-solid fa-paperclip"></i> {t('navbar.contact')}
               </NavLink>
            </div>

            <div className="nav-item-wrapper">
               <div className="nav-item"></div>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
