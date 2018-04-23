import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom'
import './style/index.css';
import "./semantic-dist/semantic.min.css";
//import registerServiceWorker from './registerServiceWorker';

 ReactDOM.render(
   <Router>
     <App />
   </Router>,
   document.getElementById("root")
 );

//registerServiceWorker();
