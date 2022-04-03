import React, { FC, useContext } from 'react';
import './App.css';
import { UserContext } from './User';
import "bootswatch/dist/morph/bootstrap.min.css"
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrudAddPage from './pages/CrudAddPage';
import CrudEditPage from './pages/CrudUpdatePage';
import CrudDeletePage from './pages/CrudDeletePage';
import OrdersPage from './pages/OrdersPage';
import ShippingPage from './pages/ShippingPage';
import CatalogPage from './pages/CatalogPage';

const App: FC = () => {
  const { dispatch: {setUser}} = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element = 
          {
            <HomePage setUser={setUser}/>
          }
        />
        <Route
          path='login'
          element = 
          {
            <LoginPage setUser={setUser}/>
          }
          />
        <Route
          path='signup'
          element =
          {
            <SignUpPage setUser={setUser}/>
          }
          />
        <Route
          path='addProduct'
          element={
            <CrudAddPage setUser={setUser}/>
          }
          />
        <Route
          path='editProduct'
          element={
            <CrudEditPage setUser={setUser} />
          }
        />
        <Route
          path='deleteProduct'
          element={
            <CrudDeletePage setUser={setUser}/>
          }
        />
        <Route
          path='catalog'
          element={
            <CatalogPage setUser={setUser}/>
          }
        />
        <Route
          path='orders'
          element={
            <OrdersPage setUser={setUser}/>
          }
        />
        <Route
          path='shipping'
          element={
            <ShippingPage setUser={setUser}/>
          }
        />
      </Routes>
    </Router>
    
);
}
export default App;
