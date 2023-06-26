import React, { useState } from 'react';
import { upLoadImageUrl } from '../../store/reducer/authSlide';

import { useDispatch, useSelector } from 'react-redux';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Services/firebase';

import UserService from '../../Services/User.service';

import './_style_userinfor.scss';

function UserInfor(props) {
   console.log('render UserInfor');
   const { user } = props;
   const dispatch = useDispatch();

   const [fileUrl, setFileUrl] = useState('');
   const [saveAvatar, setSaveAvatar] = useState(false);

   const uploadFile = async (e, typeFIle = 'image') => {
      const file = e.target.files[0];
      const fileName = `${user.id}.${user.username}.png`;
      const imageRef = ref(storage, `${typeFIle}/${fileName}`);
      const metadata = {
         contentType: 'image/jpeg'
      };

      await uploadBytes(imageRef, file, metadata).then(snapshot => {
         getDownloadURL(snapshot.ref).then(url => {
            setFileUrl(prev => [...prev, url]);
            dispatch(upLoadImageUrl(url));
            console.log('new avatar: ', url);
         });
      });
      e.preventDefault();
      setSaveAvatar(true); // show button "save"
   };

   const handleSaveUpload = async () => {
      const id = user.id;
      const obj = {
         avatarUrl: fileUrl
      };
      const token = user.token;
      await UserService.updateAvatar(id, obj, token);
      setSaveAvatar(false); // close button "save"
   };

   return (
      <div className="auth-infor-container">
         {!saveAvatar && (
            <div className="auth-image">
               <img src={user.avatar_url} alt="" />
               <div className="upload-image-box">
                  <label htmlFor="avatar" id="label-upload">
                     <i className="fa-solid fa-camera"></i>
                  </label>
                  <input type="file" name="avatar" id="uploader" onChange={() => uploadFile()} />
               </div>
            </div>
         )}
         {saveAvatar && (
            <div className="auth-image">
               <img src={user.avatar_url} alt="" />
               <div className="upload-save-image-box">
                  <div className="accept-save button-base" onClick={() => handleSaveUpload()}>
                     save ?
                  </div>
               </div>
            </div>
         )}

         <div className="auth-infor-container">
            <div className="auth-infor-box">
               <div className="auth-infor-item">
                  <i className="fa-solid fa-user-graduate"></i>
                  <i>Username:</i> {user.username}
               </div>
               <div className="auth-infor-item">
                  <i className="fa-solid fa-envelope"></i>
                  <i>Email:</i> {user.email}
               </div>
               <div className="auth-infor-item">
                  <i className="fa-solid fa-unlock-keyhole"></i>
                  <i>Role:</i>
                  <div className="button-base"> {user.role}</div>
               </div>
            </div>
            <div className="auth-infor-box">
               <div className="auth-infor-item">
                  <i className="fa-solid fa-chart-line"></i>
                  <i>GPA:</i> {'3.57'}
               </div>
               <div className="auth-infor-item">
                  <i className="fa-solid fa-ticket"></i>
                  <i>All ticket:</i> {'156'}
               </div>
               <div className="auth-infor-item">
                  <i className="fa-solid fa-ticket"></i>
                  <i className="button-base button-base-success">Accumulation:</i>
                  <div className="button-base"> {'127'}</div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default UserInfor;
