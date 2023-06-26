import { createSlice } from '@reduxjs/toolkit';
import storageKey from '../../Services/localStorageKey';

const settingSlice = createSlice({
   name: 'setting',
   initialState: {
      theme: localStorage.getItem(storageKey.setting.theme) ?? 'light',
      language: localStorage.getItem(storageKey.setting.language) ?? 'en',
      font_size: localStorage.getItem(storageKey.setting.font_size) ?? 16,
      area: localStorage.getItem(storageKey.setting.area) ?? 'Asia/Ho_Chi_Minh'
   },
   reducers: {
      storeTheme: (state, action) => {
         state.theme = action.payload;
         localStorage.setItem(storageKey.setting.theme, action.payload);
      },
      storeLanguage: (state, action) => {
         state.language = action.payload;
         // console.log('in actions ', action.payload);
         localStorage.setItem(storageKey.setting.language, action.payload);
         // console.log('get storage ', getLocal(storageKey.setting.language));
      },
      storeFontSize: (state, action) => {
         state.font_size = action.payload;
         localStorage.setItem(storageKey.setting.font_size, action.payload);
      },
      storeArea: (state, action) => {
         state.area = action.payload;
         localStorage.setItem(storageKey.setting.area, action.payload);
      }
   }
});

const { reducer, actions } = settingSlice;
export const { storeTheme, storeArea, storeFontSize, storeLanguage } = actions;
export default reducer;
