import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LangState from './lang';
import UserState from './User'
import OpenState from './OpenCart';

ReactDOM.render(
  <React.StrictMode>
      <UserState>
        <LangState>
          <OpenState>
            <App />
          </OpenState>
        </LangState>
      </UserState>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
