import { createSlice } from '@reduxjs/toolkit';
import storageKey, { getLocal, setLocal } from '../../Services/localStorageKey';

const postCacheSlice = createSlice({
   name: 'post',
   initialState: {
      posts: getLocal(storageKey.save.post) ?? [],
      postsId: getLocal(storageKey.save.postId) ?? []
   },
   reducers: {
      storePost: (state, action) => {
         let post = action.payload;
         if (state.postsId.some(i => i === action.payload.id)) {
            console.log('ton tai');
            return;
         } else {
            const newStateId = [...state.postsId, post.id];
            state.postsId = newStateId;
            setLocal(storageKey.save.postId, newStateId);

            const newState = [...state.posts, post];
            state.posts = newState;
            setLocal(storageKey.save.post, newState);
         }
      },
      deletePostWithId: (state, action) => {
         const filterId = action.payload;

         // upload post
         const newState = state.posts.filter(post => post.id !== filterId);
         state.posts = newState;
         setLocal(storageKey.save.post, newState);

         // update postId
         const newStateId = state.postsId.filter(i => i !== filterId);
         state.postsId = newStateId;
         setLocal(storageKey.save.postId, newStateId);
      }
   }
});

const { reducer, actions } = postCacheSlice;
export const { storePost, deletePostWithId } = actions;
export default reducer;
