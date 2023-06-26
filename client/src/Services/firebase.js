// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
   apiKey: 'AIzaSyBQO8aQmVXx13ky9N8VqVezLvGbvhQ1Whw',
   authDomain: 'react-ct466.firebaseapp.com',
   projectId: 'react-ct466',
   storageBucket: 'react-ct466.appspot.com',
   messagingSenderId: '787566180735',
   appId: '1:787566180735:web:6028d13c2431cc8c8d424a'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// bug import: https://stackoverflow.com/questions/70445014/module-not-found-error-package-path-is-not-exported-from-package

// https://console.firebase.google.com/u/2/project/react-ct466/settings/general/web:M2FhMTZjMDItYTYyYi00ZGJkLWI1OWItZjBlMGZhMDVmMmRj

// bug permission: https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions
/**
 * change file: https://console.firebase.google.com/u/2/project/react-ct466/firestore/rules
 * giải pháp tạm thời: tắt tất cả bảo mật: allow read, write: if true;
 * giải pháp tối ưu: auth -> authen -> read/write (có thời gian thì tìm hiểu sau)
 */

/**
 * deploy:
 * firebase login
 * firebase init
 * - chọn dự án hiện có hoặc tạo dự án mới
 * - chọn dự thư mục cần hosting (public) => build
 * - firebase sẽ render ra một thư mục build >> index.html => chúng ta sẽ xóa thư mục này.
 * ===
 * npm run build
 * - reactjs sẽ build ra thư mục build chứa có đã minify
 * ===
 * firebase deploy
 * === Deploying to 'react-ct466'...
 * i  deploying hosting
 * i  hosting[react-ct466]: beginning deploy...
 * i  hosting[react-ct466]: found 18 files in build
 * i  hosting[react-ct466]: file upload complete
 * i  hosting[react-ct466]: finalizing version...
 * i  hosting[react-ct466]: version finalized
 * i  hosting[react-ct466]: releasing new version...
 * i  hosting[react-ct466]: release complete
 * +  Deploy complete!
 * Project Console: https://console.firebase.google.com/project/react-ct466/overview
 * Hosting URL: https://react-ct466.web.app (khá là oke trừ việc chưa kết nối với backend)
 *
 * 
 * == upload- download file:
 * App information:
  - App ID: 1:787566180735:web:0c8976c3871a4bc58d424a
  - Display name: react-app-ct466

You can run this command to print out your new app's Google Services config:
  firebase apps:sdkconfig WEB 1:787566180735:web:0c8976c3871a4bc58d424a

  -- download config: firebase apps:sdkconfig
 */
