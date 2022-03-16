import React from 'react';

import './_style.scss';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function Profile() {
   return (
      <>
         <Header></Header>
         <div className='profile'>Profile</div>
         <div className="sdad">Chứa thêm contact</div>
         <Footer></Footer>
      </>
   );
}
export default Profile;
