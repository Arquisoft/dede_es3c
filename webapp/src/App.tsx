import React, { FC, useContext, useState } from 'react';
import './App.css';
import { LangContext } from './lang';
import { UserContext } from './User';
import "bootswatch/dist/minty/bootstrap.min.css"
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrudAddPage from './pages/CrudAddPage';
import CrudEditPage from './pages/CrudEditPage';
import CrudDeletePage from './pages/CrudDeletePage';
import Prueba from './pages/Catalog';

const App: FC = () => {
  const { dispatch: {translate }} = useContext(LangContext);
  const { dispatch: {setUser}} = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route
          path='home'
          element = 
          {
            <HomePage setUser={setUser} translate={translate}/>
          }
        />
        <Route
        path='login'
        element = 
        {
          <LoginPage setUser={setUser} translate={translate} />
        }
        />
        <Route
        path='signup'
        element =
        {
          <SignUpPage setUser={setUser} translate={translate} />
        }
        />
        <Route
          path='addProduct'
          element={
            <CrudAddPage setUser={setUser} translate={translate}/>
          }
          />
        <Route
          path='editProduct'
          element={
            <CrudEditPage setUser={setUser} translate={translate} />
          }
        />
        <Route
          path='deleteProduct'
          element={
            <CrudDeletePage setUser={setUser} translate={translate} />
          }
        />
        <Route
          path='catalog'
          element={
            <Prueba setUser={setUser} translate={translate} />
          }
        />
      </Routes>
    </Router>
    
);
}
export default App;
