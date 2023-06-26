import React from 'react';
import './_style.scss';

import CardImage from '../../Assets/images/card-img.jpg';

function Index(props) {
   console.log('render Department');
   const { dpm } = props;
   return (
      <div className="card-item">
         <div className="card-img-box">
            <span className="card-code text-base"> {dpm.code}</span>
            <img
               // src="https://i.pinimg.com/564x/d7/cd/c3/d7cdc3046dd58852b94f63ec6315ed7c.jpg"
               src={
                  dpm.logo ??
                  'https://i.pinimg.com/564x/d7/cd/c3/d7cdc3046dd58852b94f63ec6315ed7c.jpg'
               }
               alt=""
               loading="lazy"
               className="card-img"
            />
         </div>
         <div className="card-name text-base">{dpm.name}</div>
         <div className="card-description">
            <div className="description">{dpm.description}</div>
         </div>
         <div className="card-button">
            <a href={dpm.homepage} target="_blank" rel="noreferrer" className="button button-base">
               <i className="fa-solid fa-house"></i> Trang Chủ
            </a>
            <a
               href={dpm.forum || '#'}
               target="_blank"
               rel="noreferrer"
               className="button button-base"
            >
               <i className="fa-solid fa-circle-question"></i> Diễn đàn
            </a>
         </div>
      </div>
   );
}

export default Index;
