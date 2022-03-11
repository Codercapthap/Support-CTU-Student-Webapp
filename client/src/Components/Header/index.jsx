import React, { useEffect } from 'react';

import './_style.scss';
import { useState } from 'react';

import { varCSS } from '../../helpers/vanillaJs.js';

function Navbar() {
   const [showNavbar, setShowNavbar] = useState(false);

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
      // const bars = document.querySelector('.bars');
      // console.log(bars.innerHTML);
      if (showNavbar) {
         varCSS('navbar-width', '0px');
      } else if (!showNavbar) {
         varCSS('navbar-width', '200px');
      }
      // const navbarWidth = varCSS('navbar-width');
      // console.log(navbarWidth);
   };

   return (
      <div className="header">
         <div className="header-item bars" onClick={handleShowNavbar}>
            {/* <i class="fa-solid fa-arrow-left-long-to-line"></i> */}
            {showNavbar && <i class="fa-solid fa-arrow-left-long"></i>}
            {!showNavbar && <i class="fa-solid fa-arrow-right-long"></i>}
         </div>
         <div className="header-item">
            <input type="text" name="search" />
            <i class="fa-solid fa-magnifying-glass"></i>
         </div>
         <div className="header-item">
            <i class="fa-solid fa-bell"></i>
            <span className="count-box">
               <span className="count">1</span>
            </span>
         </div>
         <div className="header-item">
            <i class="fa-solid fa-circle-user"></i>
         </div>
      </div>
   );
}

export default Navbar;
