import React, { FC, useContext } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { LangContext } from './lang';
import Homepage from './components/Homepage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CataloguePage from './pages/CataloguePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: FC = () => {
  const { dispatch: { translate }} = useContext(LangContext);
  return (
    <Router>
      <Header fixed transparent />
      <Routes>
        <Route
          index element = 
          {
            <Homepage translate={translate}/>
          }
        />
        <Route
        path='login'
        element = 
        {
          <LoginPage translate={translate} />
        }
        />
        <Route
        path='signup'
        element =
        {
          <SignUpPage translate={translate} />
        }
        />
        <Route
          path='catalogue'
          element={
            <CataloguePage translate={translate}/>
          }
        />
      </Routes>
    </Router>
    
);

}
export default App;
