import { Routes, Route } from 'react-router-dom';

import Home from './Views/Home';
import Blog from './Views/Blog';
import About from './Views/About';
import Forum from './Views/Forum';
import Setting from './Views/Setting';

// sub route
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';

import Navbar from './Components/Navbar';

import { varCSS } from './helpers/vanillaJs';

import './App.scss';
import { useEffect } from 'react';

// import { useState } from 'react';

function App() {
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

   return (
      <div className="app">
         <div id="anchor"></div>
         <div className="app-box">
            <div className="app-item">
               <Navbar />
            </div>
            <div className="app-item">
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/register" element={<Register />} />
               </Routes>
            </div>
         </div>
         <a href="#anchor" className="go-top">
            <i class="fa-solid fa-arrow-up"></i>
         </a>
      </div>
   );
}

export default App;
