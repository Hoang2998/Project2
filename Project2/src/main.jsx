import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./store";
import {Provider} from "react-redux"
// import './index.css'
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter } from "react-router-dom"
ReactDOM.createRoot(document.getElementById('root')).render(

 <Provider store={store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>
 </Provider> 


)
