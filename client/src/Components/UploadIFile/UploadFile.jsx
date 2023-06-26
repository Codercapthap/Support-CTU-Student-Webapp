import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../Services/firebase';
import { v4 as uuid } from 'uuid';

// https://www.npmjs.com/package/uuid
import './_style.scss';

// read more: https://firebase.google.com/docs/storage/web/upload-files

function ImageUploadItem(props) {
   const { obj } = props;

   const copyText = idName => {
      let temp = document.createElement('textarea');
      document.body.appendChild(temp);
      temp.value = document.getElementById(`${idName}`).innerHTML;
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
   };

   const handleCopyUrl = (id, url) => {
      copyText(id);
   };
   return (
      <div className="uploaded-image-box" key={obj.id}>
         <img className="uploaded-image" src={obj.url} width="50px" height="50px" />
         <div className="uploaded-image-url" id={obj.id}>
            {obj.url}
         </div>
         <div
            className="button-base uploaded-image-copy"
            onClick={() => handleCopyUrl(obj.id, obj.url)}
         >
            Copy
         </div>
      </div>
   );
}

function UploadFile(props) {
   console.log('render UploadFile');
   const { selected } = props;
   // console.log(selected);

   const [imageUpload, setImageUpload] = useState(null);
   const [imageUrls, setImageUrls] = useState([]);

   const uploadFile = () => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `${selected.topic}/${selected.post}/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then(snapshot => {
         getDownloadURL(snapshot.ref).then(url => {
            const urlObj = {
               id: uuid(),
               url: url
            };
            setImageUrls(prev => [...prev, urlObj]);
            console.log(url);
         });
      });
   };

   useEffect(() => {
      const imagesListRef = ref(storage, `${selected.department}/${selected.topic}`);
      listAll(imagesListRef).then(response => {
         response.items.forEach(item => {
            getDownloadURL(item).then(url => {
               // push new url item to array
               const urlObj = {
                  id: uuid(),
                  url: url
               };
               setImageUrls(prev => [...prev, urlObj]);
            });
         });
      });
      console.log(imageUrls);
   }, []);

   return (
      <div className="upload-file-container">
         {imageUrls.map(obj => (
            <ImageUploadItem obj={obj} />
         ))}
         <div className="upload-file-footer">
            <input
               type="file"
               onChange={e => {
                  setImageUpload(e.target.files[0]);
               }}
            />
            <button className="button-base" onClick={uploadFile}>
               <i className="fa-solid fa-upload"></i>
            </button>
         </div>
      </div>
   );
}

export default UploadFile;
