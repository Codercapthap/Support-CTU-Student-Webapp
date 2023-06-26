const storageKey = {
   currentUser: 'user',
   defaultUser: {
      id: -999,
      token: 'token',
      username: 'anonymous',
      email: 'anonymous@gmail.com',
      role: 'passersby',
      refresh_token: 'refresh_token',
      avatar_url: 'https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg'
   },
   department: 'department',
   setting: {
      theme: 'theme',
      language: 'language',
      area: 'area',
      font_size: 'font-size'
   },
   save: {
      post: 'save_post',
      postId: 'save_post_id',
      owner: 'post_owner'
   }
};
export const setLocal = (key, obj) => {
   // only use to save obj
   localStorage.setItem(key, JSON.stringify(obj));
};

export const getLocal = key => {
   // only use to save obj
   const parse_1 = JSON.parse(localStorage.getItem(key));
   return parse_1;
};

export default storageKey;
