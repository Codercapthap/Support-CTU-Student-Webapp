import React from 'react';
import { useLayoutEffect, useEffect } from 'react';

import './_style.scss';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import DepartmentItem from '../../Components/DepartmentItem/index';
// import PostCreateMarkdown from '../../Components/Post/PostCreateMarkdown';

import Departments from '../../Assets/departments.json';

function Home() {
   console.log('render Home');
   useLayoutEffect(() => {
      const home = document.querySelector('.home');
      const handleScroll = () => {
         if (window.scrollY > 0 && !home.classList.contains('margin-top')) {
            home.classList.add('margin-top');
         } else if (window.scrollY <= 0) {
            home.classList.remove('margin-top');
         }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <>
         <Header></Header>
         <div className="home">
            <div className="n-row card-box">
               {Departments.map(dpm => (
                  <div className="n-col" key={dpm.code}>
                     <DepartmentItem dpm={dpm} />
                  </div>
               ))}
            </div>
         </div>
         {/* <PostCreateMarkdown /> */}
         <Footer></Footer>
      </>
   );
}
export default Home;
