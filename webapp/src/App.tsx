import React, { FC, useContext } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { LangContext } from './lang';
import Homepage from './components/Homepage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './components/Layout';

const App: FC = () => {
  const { dispatch: { translate }} = useContext(LangContext);
  return (
    <div>
      <Header fixed transparent />  
      <SignUpPage translate={translate} />
    </div>
    
);

}
export default App;
