import React, { useEffect } from 'react';

import Header from '../../Components/Header';
// import Footer from '../../Components/Footer';

import ToggeTheme from '../../Components/ToggeTheme';
import { varCSS } from '../../Common/js/vanillaJs';
import './_style.scss';

import { useTranslation } from 'react-i18next';

// change font size
import { useDispatch, useSelector } from 'react-redux';
import {
   storeFontSize,
   storeTheme,
   storeLanguage,
   storeArea
} from '../../store/reducer/settingSlice';

function Setting() {
   console.log('render Setting');
   const { t } = useTranslation();
   const dispatch = useDispatch();

   const language = useSelector(state => state.config.language);
   const theme = useSelector(state => state.config.theme);
   const fontSize = useSelector(state => state.config.font_size);
   const area = useSelector(state => state.config.area);

   useEffect(() => {
      // update language box
      const controlLanguage = document.querySelector('.control-language');
      controlLanguage.value = language;
      // update font-size range
      const controlFontSize = document.querySelector('.control-font-size');
      controlFontSize.value = fontSize;
      // update area box
      const controlArea = document.querySelector('.control-area');
      controlArea.value = area;
   }, [language, fontSize, area]);

   const changeLanguage = e => {
      const value = e.target.value;
      dispatch(storeLanguage(value));
   };
   const changeCurrentTheme = value => {
      dispatch(storeTheme(value));
   };
   const changeFontSize = e => {
      const selectedFontSize = Number.parseInt(e.target.value);
      dispatch(storeFontSize(selectedFontSize));
      varCSS('font-size', `${selectedFontSize}px`);
   };
   const changeArea = e => {
      const selectedArea = e.target.value;
      console.log(selectedArea);
      dispatch(storeArea(selectedArea));
   };

   return (
      <>
         <Header></Header>
         <div className="setting">
            <div className="setting-item">
               <div className="setting-name">
                  <i className="fa-solid fa-wrench"></i> {t('setting.language.name')}
               </div>
               <select
                  className="select-group control-language"
                  name="languages"
                  onChange={changeLanguage}
               >
                  <option className="select-item" value="en">
                     {t('setting.language.option.english')}
                  </option>
                  <option className="select-item" value="vi">
                     {t('setting.language.option.vietnamese')}
                  </option>
               </select>
            </div>
            <div className="setting-item">
               <div className="setting-name">
                  <i className="fa-solid fa-wrench"></i> {t('setting.area.name')}
               </div>
               <select className="select-group control-area" onChange={changeArea}>
                  <option className="select-item" value="Asia/Ho_Chi_Minh">
                     {t('setting.area.option.vietnam')}
                  </option>
                  <option className="select-item" value="Asia/Tokyo">
                     {t('setting.area.option.japan')}
                  </option>
                  <option className="select-item" value="Asia/Hong_Kong">
                     {t('setting.area.option.china')}
                  </option>
                  <option className="select-item" value="America/Los_Angeles">
                     {t('setting.area.option.united_states')}
                  </option>
               </select>
            </div>
            <div className="setting-item">
               <div className="setting-name">
                  <i className="fa-solid fa-wrench"></i> {t('setting.font_size.name')}
               </div>
               <div className="button-base theme-box">{fontSize}px</div>
               <input
                  type="range"
                  className="control-font-size"
                  min="14"
                  max="24"
                  onChange={changeFontSize}
               />
            </div>
            <div className="setting-item">
               <div className="setting-name">
                  <i className="fa-solid fa-wrench"></i> {t('setting.theme.name')}
               </div>
               <div className="theme-tip text-overflow">{t('setting.theme.tip')}</div>
               <div className="button-base theme-box">{theme}</div>
               <ToggeTheme changeCurrentTheme={changeCurrentTheme} />
            </div>
         </div>

         {/* <Footer></Footer> */}
      </>
   );
}
export default Setting;
