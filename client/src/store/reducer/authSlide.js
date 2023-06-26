import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../Services/Auth.service';
import storageKey from '../../Services/localStorageKey';

export const registerApi = createAsyncThunk('users/register', async payload => {
   try {
      console.log('in action: ', payload);
      const data = await authApi.register(payload);
      return data;
   } catch (error) {
      console.log(error);
      return error.message;
   }
});

export const login = createAsyncThunk('users/login', async payload => {
   try {
      const res = await authApi.login(payload);
      // console.log('[header] ', res.headers, res.data);
      const data = {
         id: res.data.id,
         token: `${res.headers.authorization}`,
         refresh_token: 'refresh_token',
         username: res.data.username,
         email: res.data.email,
         role: res.data.role,
         avatar_url: res.data.avatar_url
      };
      localStorage.setItem(storageKey.currentUser, JSON.stringify(data));
      return data;
   } catch (error) {
      console.log(error);
      return error.message;
   }
});

const userSlice = createSlice({
   name: 'user',
   initialState: {
      current: JSON.parse(localStorage.getItem(storageKey.currentUser)) ?? storageKey.defaultUser,
      loadding: {
         isLogging: false,
         isRegistering: false
      },
      error: {
         isLogging: 200,
         isRegistering: 404
      }
   },
   reducers: {
      logout(state) {
         state.current = storageKey.defaultUser;
         localStorage.removeItem(storageKey.currentUser);
      },
      upLoadImageUrl(state, action) {
         state.current.avatar_url = action.payload;
      }
   },
   extraReducers: {
      // dang ki thanh cong
      /**
       * pending: chưa giải quyết, còn trong quá trình chờ
       * rejected: thất bại
       * fulfilled: thành công
       */
      [registerApi.pending]: (state, action) => {
         state.loadding.isRegistering = true;
         state.error.isRegistering = false;
         console.log('register...');
      },
      [registerApi.fulfilled]: (state, action) => {
         state.loadding.isRegistering = false;
         state.error.isRegistering = false;
         console.log('register success');
      },
      [registerApi.rejected]: (state, action) => {
         state.loadding.isRegistering = false;
         state.error.isRegistering = true;
         console.log('register errors...');
      },
      [login.pending]: (state, action) => {
         state.loadding.isLogging = true;
         state.error.isLogging = false;
         console.log('login...');
      },
      [login.fulfilled]: (state, action) => {
         state.loadding.isLogging = false;
         state.error.isLogging = false;
         state.current = action.payload;
         console.log('login success');
      },
      [login.rejected]: (state, action) => {
         state.loadding.isLogging = false;
         state.error.isLogging = true;
         console.log('login false...');
      }
   }
});

const { actions, reducer } = userSlice;
export const { logout, upLoadImageUrl } = actions;
export default reducer;

/**
 * new Object().toString()
 * => "[object Object]"
 * JSON.parse(new Object())
 * => Uncaught SyntaxError: Unexpected token o in JSON at position 1
 * JSON.parse("[object Object]")
 * => Uncaught SyntaxError: Unexpected token o in JSON at position 1
 */
// bug: https://stackoverflow.com/questions/38380462/syntaxerror-unexpected-token-o-in-json-at-position-1
// => dùng trực tiếp
