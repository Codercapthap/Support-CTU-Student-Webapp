import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

// Components
import Navbar from '../Components/Navbar';

import './_style.scss';

// Support
import { varCSS } from '../Common/js/vanillaJs';
import { useSelector } from 'react-redux';
import storageKey from '../Services/localStorageKey';

import { getAlls } from '../store/reducer/departmentSlice';
import { useDispatch } from 'react-redux';

// import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './App.routes';

// change language
// import { useTranslation } from 'react-i18next';
import i18n from '../Translations/i18n';

function App() {
   const dispatch = useDispatch();

   const routing = useRoutes(routes);
   let language = useSelector(state => state.config.language);

   useEffect(() => {
      (async function () {
         dispatch(getAlls());
      })();
      i18n.changeLanguage(language);
   }, [language]);
   useEffect(() => {
      const handleScroll = () => {
         const top = document.querySelector('.go-top');
         if (window.scrollY >= 5) {
            top.classList.add('show-top-button');
         } else if (window.scrollY <= 5) {
            top.classList.remove('show-top-button');
         }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);
   useEffect(() => {
      varCSS('navbar-width', '0px');
      const setTheme = theme => {
         document.documentElement.setAttribute('data-theme', theme);
         localStorage.setItem('theme', `${theme}`);
      };
      const theme = localStorage.getItem('theme') ?? 'light';
      if (theme === 'light') {
         setTheme('light');
      } else {
         setTheme('dark');
      }
   }, []);

   const smoothScrollBackToTop = () => {
      const handleScroll = () => {
         window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
         });
      };
      handleScroll();
      // https://stackoverflow.com/questions/64180685/how-to-slow-down-scroll-to-top-speed

      const showScrollInfor = () => {
         console.log(window);
      };
      showScrollInfor();
   };

   return (
      <div className="app">
         <div id="anchor"></div>
         <div className="app-box">
            <div className="app-item">
               <Navbar />
            </div>
            <div className="app-item">{routing}</div>
         </div>
         <div className="go-top" id="scrollTop" onClick={smoothScrollBackToTop}>
            <i className="fa-solid fa-arrow-up"></i>
         </div>
      </div>
   );
}

export default App;

// get anyone from: https://madewithreactjs.com/
