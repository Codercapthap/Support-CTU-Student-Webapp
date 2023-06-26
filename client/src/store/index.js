import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducer/authSlide';
import departmentReducer from './reducer/departmentSlice';
import settingReducer from './reducer/settingSlice';
import postCacheSlide from './reducer/postCacheSlide';

const store = configureStore({
   reducer: {
      // counter: counterReducer, // test from redux-toolkit
      auth: authReducer, // save user_infor, token, role,...
      department: departmentReducer, // get all department
      config: settingReducer,
      postCache: postCacheSlide
   },
   middleware: getDefaultMiddleware =>
      // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
      getDefaultMiddleware({
         serializableCheck: false
      })
});

export default store;
