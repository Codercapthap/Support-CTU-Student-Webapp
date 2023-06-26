import React, { useEffect, useState } from 'react';

import { generageTime } from '../../Common/js/vanillaJs';

import { useDispatch, useSelector } from 'react-redux';

import { storePost, deletePostWithId } from '../../store/reducer/postCacheSlide';

// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

import MarkdownIt from 'markdown-it';
// var result = md.render('# markdown-it rulezz!');

// import MarkdownIt from 'markdown-it';

import './_style_2.scss';
/**
 *
 * Convert string to jsx:
 * https://stackoverflow.com/questions/36104302/how-do-i-convert-a-string-to-jsx
 */

function PostItem(props) {
   console.log('render PostItem');
   const { post, destroyPost, acceptPost } = props;

   const dispatch = useDispatch();
   const user = useSelector(state => state.auth.current);
   const postCacheId = useSelector(state => state.postCache.postsId);

   const md = new MarkdownIt();

   const [isSave, setIsSave] = useState(postCacheId.includes(post.id));

   useEffect(() => {
      const includes = postCacheId.some(i => i === post.id);
      setIsSave(includes);
   }, [post]);

   const savePostToLocal = () => {
      if (isSave) {
         dispatch(deletePostWithId(post.id));
      } else {
         dispatch(storePost(post));
      }
      setIsSave(!isSave);
   };

   const handleAcceptPost = () => {
      // console.log('Accept post item: ', post.id, user.role);
      acceptPost(post.id);
   };

   const handleDestroyPost = () => {
      // console.log('Destroy post item: ', post.id, user.role);
      destroyPost(post.id);
   };

   return (
      <div className="post_success-item">
         <div className="post_success-infor">
            <img className="author-avatar" src={post.avatar_url} alt="avatar author" />
            <div className="author-username">Tác giả {post.username}</div>
            <div className="author-username">
               [{post.id}: {post.user_id}]
            </div>
            <div className="post_success-infor-box">
               <div className="post_success-infor-box-item">
                  <i className="fa-solid fa-upload"></i> {generageTime(post.created_at)}
               </div>
               <div className="post_success-infor-box-item">
                  <i className="fa-solid fa-eye"></i> {post.post_view}
               </div>
            </div>

            {user.role === 'admin' && !post.is_accepted && (
               <div className="post_success-infor-admin-box">
                  <div
                     className="button-base post_success-infor-admin-item"
                     onClick={handleDestroyPost}
                  >
                     <i className="fa-solid fa-bomb"></i>
                  </div>
                  <div
                     className="button-base post_success-infor-admin-item"
                     onClick={handleAcceptPost}
                  >
                     <i className="fa-solid fa-check-to-slot"></i>
                  </div>
               </div>
            )}
            {user.role !== 'admin' && (
               <div className="post_success-infor-box save-local" onClick={savePostToLocal}>
                  <i
                     class={isSave ? 'fa-solid fa-bookmark active-save' : 'fa-solid fa-bookmark'}
                  ></i>
               </div>
            )}
         </div>
         <div className="post_success-body">
            <div className="post_success-title">{post.post_title}</div>
            <div
               className="post_success-description"
               dangerouslySetInnerHTML={{
                  __html: md.render(post.post_content) || '# Post content'
               }}
            ></div>
         </div>
      </div>
   );
}

export default PostItem;
