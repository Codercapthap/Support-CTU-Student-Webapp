import React from 'react';

import './_style.scss';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import Departments from '../../Assets/departments.json';

//img
import CardImage from '../../Assets/images/card-img.jpg';

function index() {
   return (
      <>
         <Header></Header>
         <div className="home">
            <div className="n-row card-box">
               {Departments.map(dpm => (
                  <div className="n-col card-item" key={dpm.code}>
                     <div className="card-img-box">
                        <span className="card-code text-base"> {dpm.code}</span>
                        <img
                           // src="https://i.pinimg.com/564x/d7/cd/c3/d7cdc3046dd58852b94f63ec6315ed7c.jpg"
                           src={CardImage}
                           alt=""
                           className="card-img"
                        />
                     </div>
                     <div className="card-name text-base">{dpm.name}</div>
                     <div className="card-description">
                        <div className="description">{dpm.description}</div>
                     </div>
                     <div className="card-button">
                        <a href={dpm.homepage} target="_blank" className="button button-base">
                           <i class="fa-solid fa-house"></i> Trang Chủ
                        </a>
                        <a href="#" className="button button-base">
                           <i class="fa-solid fa-circle-question"></i> Diễn đàn
                        </a>
                     </div>
                  </div>
               ))}
               {/* <div className="n-col card-item">
                  <img src="" alt="" className="card-img" />
                  <div className="card-name">Khoa </div>
                  <div className="card-description"></div>
                  <div className="card-button">
                     <a href="#" className="button">
                        Xem Thêm
                     </a>
                     <a href="#" className="button">
                        Diễn đàn
                     </a>
                  </div>
               </div>
               <div className="n-col card-item">2</div>
               <div className="n-col card-item">3</div>
               <div className="n-col card-item">4</div>
               <div className="n-col card-item">5</div>
               <div className="n-col card-item">
                  6gfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfd
               </div> */}
            </div>
         </div>
         <Footer></Footer>
      </>
   );
}
export default index;
