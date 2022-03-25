import React from 'react';
import ReactDOM from 'react-dom';
import './globalStyles/index.css';
import './globalStyles/App.css';
import './globalStyles/media.css';
import './globalStyles/loader.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import TopNavBar from './components/topNavBar/index'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/*<center><TopNavBar /></center>*/}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

