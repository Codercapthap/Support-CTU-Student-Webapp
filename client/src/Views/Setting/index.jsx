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
               <div className="setting-name">
                  <i class="fa-solid fa-wrench"></i> Chọn Ngôn Ngữ
               </div>
               <select className="select-group" name="languages" onClick={showValueOption}>
                  <option className="select-item" value="english">
                     Tiếng Anh
                  </option>
                  <option className="select-item" value="vietnamese">
                     Tiếng Việt
                  </option>
               </select>
            </div>
            <div className="setting-item">
               <div className="setting-name">
                  <i class="fa-solid fa-wrench"></i> Chọn Múi Giờ
               </div>
               <select className="select-group">
                  <option className="select-item" value="...">
                     Đông Dương
                  </option>
                  <option className="select-item" value="...">
                     Đông Âu
                  </option>
                  <option className="select-item" value="...">
                     Đông Mỹ
                  </option>
                  <option className="select-item" value="...">
                     Đông Phi
                  </option>
               </select>
            </div>
            <div className="setting-item">
               <div className="setting-name">
                  <i class="fa-solid fa-wrench"></i> Chọn Giao Diện
               </div>
               <ToggeTheme />
            </div>
         </div>

         <Footer></Footer>
      </>
   );
}
export default Setting;
