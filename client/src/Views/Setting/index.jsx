import React from 'react';

import './_style.scss';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import ToggeTheme from '../../Components/ToggeTheme';

function Setting() {
   const showValueOption = e => {
      e.onchange = () => {
         const value = e.value,
            text = e.options[e.selectedIndex].text,
            index = e.selectedIndex;
         console.log(value, index, text);
      };
   };

   return (
      <>
         <Header></Header>
         <div className="setting">
            <div className="setting-item">
               <div className="setting-name">Chọn Ngôn Ngữ</div>
               <select name="languages" onClick={showValueOption}>
                  <option value="english">Tiếng Anh</option>
                  <option value="vietnamese">Tiếng Việt</option>
               </select>
            </div>
            <div className="setting-item">
               <div className="setting-name">Chọn Múi Giờ</div>
               <select name="hour">
                  <option value="...">Đông Dương</option>
                  <option value="...">Đông Âu</option>
                  <option value="...">Đông Mỹ</option>
                  <option value="...">Đông Phi</option>
               </select>
            </div>
            <div className="setting-item">
               <div className="setting-name">Chọn Giao Diện</div>
               <ToggeTheme />
            </div>
         </div>
      </>
   );
}
export default Setting;
