import React from 'react';
import { NavLink } from 'react-router-dom';

import './_style.scss';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import errorImage from '../../Assets/images/error.jpg';

function Error() {
   console.log('render Error');
   return (
      <>
         <Header></Header>
         <div className="error">
            <img className="error-img" src={errorImage} alt="" />
            <NavLink to="/" className="button-base">
               Back <span className="link">Home</span>
            </NavLink>
         </div>
         <Footer></Footer>
      </>
   );
}
export default Error;
