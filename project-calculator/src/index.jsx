import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import {Route , Routes, BrowserRouter} from 'react-router-dom';
/* The following line can be included in your src/index.js or App.js file */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import './Bootstrap-css/bootstrap.min.css';

// ReactDOM.render(
//   <App/> , document.getElementById('root')
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App/>
  </>
);
