import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Department from '../../Services/Department.service';
import { getLocal, setLocal } from '../../Services/localStorageKey';
import storageKey from '../../Services/localStorageKey';

export const getAlls = createAsyncThunk('department/getalls', async payload => {
   try {
      const res = await Department.getAlls();
      const data = res.data;
      setLocal(storageKey.department, data);
      return data;
   } catch (error) {
      return error.message;
   }
});

const departmentSlice = createSlice({
   name: 'department',
   initialState: {
      all: getLocal(storageKey.department) ?? [],
      loadding: 'loading...',
      error: false
   },
   reducers: {},
   extraReducers: {
      [getAlls.fulfilled]: (state, action) => {
         console.log('[payload]', action.payload);
         state.all = action.payload;
      }
   }
});

const { reducer } = departmentSlice;
export default reducer;
