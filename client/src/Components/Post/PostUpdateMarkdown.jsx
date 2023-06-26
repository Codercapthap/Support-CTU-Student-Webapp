import React, { useEffect, useLayoutEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownColor from 'markdown-it-color';
import Editor from 'react-markdown-editor-lite';

// import PostService from '../../Services/Post.service';

import 'react-markdown-editor-lite/lib/index.css';
import './_style_4.scss';
// import { useSelector } from 'react-redux';

const plugins = [
   'header',
   'font-bold',
   'font-italic',
   'font-underline',
   'font-strikethrough',
   'list-unordered',
   'list-ordered',
   'block-quote',
   'block-wrap',
   'block-code-inline',
   'block-code-block',
   'table',
   'image',
   'link',
   'clear',
   'logger',
   'mode-toggle',
   'full-screen',
   'tab-insert'
];

Editor.use(plugins, {
   tabMapValue: 10
});

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
mdParser.use(MarkdownColor, {
   inline: true
});

function PostUpdateMarkdown(props) {
   console.log('render PostUpdateMarkdown');
   const [html, setHtml] = useState('');
   const [text, setText] = useState('');
   const [title, setTitle] = useState('');

   const { post } = props;
   useEffect(() => {
      console.log('post: ', post);
      setText(post.post_content);
      console.log('content: ', text);
      setTitle(post.post_title);
      console.log('title: ', title);
   }, []);

   const handleEditorChange = ({ html, text }) => {
      setText(text);
   };

   const handleChangeTitle = e => {
      const value = e.target.value;
      setTitle(value);
   };

   // hash image to save in database
   const onImageUpload = file => {
      return new Promise(resolve => {
         const reader = new FileReader();
         reader.onload = data => {
            resolve(data.target.result);
         };
         reader.readAsDataURL(file);
      });
   };

   const handleSubmitPost = async () => {
      // console.log(html, text);
      // await handleSavePost(selected.topic, title, text);
      console.log('update post...');
   };

   return (
      <>
         <div className="post-title">
            <i className="fa-solid fa-heading post-title-icon"></i>
            <input
               type="text"
               value={title}
               placeholder="enter your post title..."
               onChange={e => handleChangeTitle(e)}
               required
            />
         </div>
         <Editor
            className="markdown-editor"
            value={post.post_content}
            renderHTML={text => mdParser.render(text)}
            onChange={handleEditorChange}
            // onImageUpload={onImageUpload}
         />
         <div className="control-create-box">
            <button className="button-base" onClick={handleSubmitPost}>
               Update
            </button>
         </div>
      </>
   );
}

export default PostUpdateMarkdown;

/**
 * Hàng nóng: https://ckeditor.com/docs/index.html
 * no markdown: https://www.npmjs.com/package/react-quill
 *
 */
