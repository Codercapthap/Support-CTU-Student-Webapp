import React from 'react';
import { NavLink } from 'react-router-dom';

// import { memo } from 'react';

import './_style.scss';

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

function index() {
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

            {/* <NavLink to="signin" className="nav-item" style={styleActiveLink}>
                  Log In
               </NavLink>

               <NavLink to="signup" className="nav-item" style={styleActiveLink}>
                  Register
               </NavLink>

               {hiddenElem && (
                  <NavLink to="signout" className="nav-item" style={styleActiveLink}>
                     Log Out
                  </NavLink>
               )} */}
         </div>
      </nav>
   );
}

export default index;
