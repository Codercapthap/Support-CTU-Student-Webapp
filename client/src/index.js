import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; //  router-vue

// use redux store
import { Provider } from 'react-redux';
import store from './store/index.js';

// change language
import i18n from './Translations/i18n';
import { I18nextProvider } from 'react-i18next';

import reportWebVitals from './reportWebVitals';

// bootstrap xấu quá!
// import 'bootstrap/dist/css/bootstrap.css';
// import './Common/css/bootstrap_grid_5.min.css';
// quill
// import 'react-quill/dist/quill.snow.css';

import App from './App/App.jsx';

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <I18nextProvider i18n={i18n}>
            <Router>
               <App />
            </Router>
         </I18nextProvider>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);

reportWebVitals();

// Tùy biến routing: https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router
