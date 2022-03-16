import React from 'react';

import './_style.scss';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function index() {
   return (
      <>
         <Header></Header>
         <div className="blog">Blog</div>
         <Footer></Footer>
      </>
   );
}
export default index;
