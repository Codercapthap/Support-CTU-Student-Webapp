import React, { useState } from 'react';
import './_style_2.scss';

import CommentService from '../../Services/Comment.service';
import { useSelector } from 'react-redux';
// import { async } from '@firebase/util';

function Index(props) {
   const { post, selected } = props;
   const [content, setContent] = useState('');
   const user = useSelector(state => state.auth.current);

   console.log('render CommentInput');

   const handleSentComment = async () => {
      const obj = {
         postId: post.id,
         commentContent: content
      };
      const token = user.token;
      await CommentService.createInPostId(obj, token);
   };

   return (
      <div className="comment-input-container">
         <div className="button-box">
            <div className="button-item">
               <i className="fa-solid fa-image"></i>
            </div>
            <div className="button-item">
               <i className="fa-solid fa-file-video"></i>
            </div>
         </div>
         <div className="input-box">
            <textarea
               className="input-area"
               cols="50"
               rows="3"
               value={content}
               onChange={e => setContent(e.target.value)}
            ></textarea>
         </div>
         <div className="submit-box">
            <div className="submit-item" onClick={handleSentComment}>
               <i className="fa-solid fa-paper-plane"></i>
            </div>
         </div>
      </div>
   );
}

export default Index;
