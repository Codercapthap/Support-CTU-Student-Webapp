import React from 'react';
import { NavLink } from 'react-router-dom';

import { useEffect } from 'react';

import './_style.scss';

import { varCSS } from '../../helpers/vanillaJs';

// const hiddenElem = true;

const styleActiveLink = ({ isActive }) =>
   isActive
      ? {
           color: 'var(--heading-color)',
           background: 'var(--bg-color)',
           borderColor: 'var(--heading-color)'
        }
      : {
           color: 'var(--text-color)',
           background: 'var(--bg-color)',
           borderColor: 'var(--text-color)'
        };

function Navbar() {
   useEffect(() => {
      const navbar = document.querySelector('.navbar');
      const handleScroll = () => {
         const navbarWidth = varCSS('navbar-width');
         if (window.scrollY > 0 && !navbar.classList.contains('fixed-navbar')) {
            if (navbarWidth === '0px') {
               return;
            }
            navbar.classList.add('fixed-navbar');
         } else if (window.scrollY <= 0 && navbar.classList.contains('fixed-navbar')) {
            navbar.classList.remove('fixed-navbar');
         }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <nav className="navbar">
         <div className="nav-box">
            <NavLink to="/" className="nav-item" style={styleActiveLink}>
               <i class="fa-solid fa-school"></i> Home
            </NavLink>

            <NavLink to="/blog" className="nav-item" style={styleActiveLink}>
               <i class="fa-brands fa-blogger-b"></i> Blog
            </NavLink>

            <NavLink to="/about" className="nav-item" style={styleActiveLink}>
               <i class="fa-solid fa-layer-group"></i> About
            </NavLink>

            <NavLink to="/forum" className="nav-item" style={styleActiveLink}>
               <i class="fa-solid fa-layer-group"></i> Forum
            </NavLink>

            <NavLink to="/setting" className="nav-item" style={styleActiveLink}>
               <i class="fa-solid fa-gear"></i> Setting
            </NavLink>
         </div>
      </nav>
   );
}

export default Navbar;
