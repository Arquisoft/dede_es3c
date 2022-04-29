import { FC, useContext, useState, useEffect } from 'react';
import './App.css';
import { UserContext } from './User';
import "bootswatch/dist/morph/bootstrap.min.css"
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrudAddPage from './pages/CrudAddPage';
import CrudEditPage from './pages/CrudEditPage';
import CrudDeletePage from './pages/CrudDeletePage';
import OrdersPage from './pages/OrdersPage';
import ShippingPage from './pages/ShippingPage';
import CatalogPage from './pages/Catalog';
import Header from "./components/Header";
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './components/Cart';
import { Drawer } from "@mui/material";
import { OpenContext } from './OpenCart';
import ClientView from './pages/ClientView';
import EditUserPage from './pages/EditUserPage';
import Button from '@mui/material/Button';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

const App: FC = () => {
  const { dispatch: {setUser}} = useContext(UserContext);
  const { dispatch: { setOpen, setAmount } } = useContext(OpenContext);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Router>
      <Header setUser={setUser} setOpen={setOpen} setAmount={setAmount}/>

      <Drawer anchor="right" open={Boolean(useContext(OpenContext).stateOpen.openCart)} onClose={() => setOpen("")}>
        <Cart setOpen={setOpen} setAmount={setAmount} cartItems={JSON.parse(localStorage.getItem("cart")!)} />
      </Drawer>

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
            <CatalogPage setUser={setUser} setAmount={setAmount}/>
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
        <Route
          path='products/name/:name'
          element={
            <ProductDetailPage setUser={setUser} setAmount={setAmount}/>
          }
        />
        <Route
          path='users'
          element={
            <ClientView setUser={setUser}/>
          }
        />
        <Route
          path='account'
          element={
            <EditUserPage setUser={setUser}/>
          }
        />
        <Route
          path = '/about'
          element = {
            <AboutPage setUser={setUser} />
          }
        />
      </Routes>

      {showButton && (
        <Button onClick={scrollToTop} className="back-to-top">
          &#8679;
        </Button>
      )}

      <Footer />
    </Router>
);
}
export default App;
