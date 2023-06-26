import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';

import './_style_3.scss';

// Readme: https://www.npmjs.com/package/react-quill
// Demo: https://zenoamaro.github.io/react-quill/
// Use: https://github.com/duongpham910/food-review

function PostCreate() {
   console.log('render PostCreate');
   const [text, setText] = useState('input here...');
   const [height, setHeight] = useState('max-content');

   const handleSavePost = () => {
      console.log('text: ', text);
      setText('input here...');
   };

   const modulesQill = {
      toolbar: [
         [{ header: [1, 2, 3, 4, false] }, { font: ['monospace', 'mirza', 'raleway', 'roboto'] }],
         ['bold', 'italic', 'underline', 'blockquote'],
         [{ align: 'center' }, { align: 'right' }, { align: 'justify' }],
         [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
         [{ color: [] }, { background: [] }],
         ['link', 'image', 'video'],
         ['clean']
      ]
   };
   const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'color',
      'link',
      'image',
      'video'
   ];

   const handleChange = e => {
      console.log('change...');
      const value = e.value;
      setText(value); // no actions?
   };

   return (
      <>
         <ReactQuill
            theme="snow"
            className="react-quill-component"
            // value={text}
            modules={modulesQill}
            formats={formats}
            placeholder={'Enter new content here...'}
            style={{ height: height }}
         >
            <div className="my-editing-area" onChange={handleChange}>
               {text}
            </div>
         </ReactQuill>
         <div className="create-control-box">
            <div className="button-base save-post" onClick={handleSavePost}>
               save
            </div>
         </div>
      </>
   );
}

export default PostCreate;

// const modulesQill = {
//    toolbar: [
//       [{ header: '1' }, { header: '2' }, { font: [] }],
//       [{ size: [] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//       ['link', 'image', 'video'],
//       ['clean']
//    ],
//    clipboard: {
//       matchVisual: false
//    },
//    history: {
//       delay: 1000,
//       maxStack: 50,
//       userOnly: false
//    },
//    imageResize: {
//       displayStyles: {
//          backgroundColor: 'black',
//          border: 'none',
//          color: 'white'
//       },
//       modules: ['Resize', 'DisplaySize', 'Toolbar']
//    }
// };
// const formats = [
//    'header',
//    'font',
//    'size',
//    'bold',
//    'italic',
//    'underline',
//    'strike',
//    'blockquote',
//    'list',
//    'bullet',
//    'indent',
//    'link',
//    'image',
//    'video'
// ];
