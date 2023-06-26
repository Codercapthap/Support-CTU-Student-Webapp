import React, { memo, useLayoutEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header';
import Login from './Login';
import UserInfor from './UserInfor';
import UserBoard from './UserBoard';
import AdminBoard from './AdminBoard';

import './_style.scss';

function Auth() {
   console.log('render Auth');
   const headerRef = useRef(null);
   const authRef = useRef(null);

   const dispatch = useDispatch();
   const user = useSelector(state => state.auth.current);

   useLayoutEffect(() => {
      const auth = document.querySelector('.auth');
      const handleScroll = () => {
         if (window.scrollY > 0 && !auth.classList.contains('margin-top')) {
            auth.classList.add('margin-top');
         } else if (window.scrollY <= 0) {
            auth.classList.remove('margin-top');
         }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return user.username !== 'anonymous' ? (
      <div className="auth">
         <Header ref={headerRef} />
         <div ref={authRef} className="auth-profile-wrapper">
            <UserInfor user={user} />
            {user.role === 'admin' && <AdminBoard />}
            {user.role !== 'admin' && <UserBoard />}
         </div>
      </div>
   ) : (
      <Login />
   );
}

export default memo(Auth);
