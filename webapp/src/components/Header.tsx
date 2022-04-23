import React, { useCallback, useState, useEffect, useRef, useContext, FC, Fragment } from 'react';
import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import "bootswatch/dist/morph/bootstrap.min.css"
import { LangContext } from '../lang';
import logo from '../img/logo-dede.svg';
import homeIcon from '../img/home-icon.svg';
import catalogIcon from '../img/catalog-icon.svg';
import englishIcon from '../img/english-icon.svg';
import loginIcon from '../img/login-icon.svg';
import logoutIcon from '../img/logout-icon.svg';
import spanishIcon from '../img/spanish-icon.svg';
import registerIcon from '../img/register-icon.svg';
import ordersIcon from '../img/checkout-icon.svg';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AddShoppingCartSharp } from '@mui/icons-material';
import { Badge } from "@mui/material";
import '../styles/Header.scss';
import userListIcon from '../img/user-list-icon.svg';
import userIcon from '../img/user-icon.svg';

interface HeaderProps {
  setUser: (user: string) => void
  setOpen: (open: string) => void
  setAmount: (amount: string) => void
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const { dispatch: { setLanguage, translate } } = useContext(LangContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef<HTMLUListElement>(null);

  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleClickOutside = useCallback((e) => {
    if (showDropdown && e.target.closest('.dropdown') !== dropdownEl.current) {
      setShowDropdown(false);
    }
  }, [showDropdown, setShowDropdown, dropdownEl]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', () => handleScroll);
    }

    
  }, [handleClickOutside]);

  const handleScroll = () => {
    if (ref && ref.current && ref.current.getBoundingClientRect()) {
      setSticky(ref.current.getBoundingClientRect().top <= 60);
    }
  };

  const chooseLanguageHandler = (value: string) => {
    setShowDropdown(false);
    setLanguage(value);
  }

  const logOut = () => {
    localStorage.setItem("cart", "[]");
    localStorage.removeItem("token");
    props.setUser("not logged");
    props.setAmount("0");
  }
  
  return (
    <div className={`sticky__wrapper ${isSticky && 'sticky'}`} ref={ref}>
      <div className="sticky--inner">
        <Nav className="container-fluid">
          {
            <div className='grid'>
            <Fragment>
                <div className='leftHeader'>
              <Navbar.Brand>
                <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
                DeDesktop
              </Navbar.Brand>

              <Link to="/" className="float-left nav-link">
                <img alt="" src={homeIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.home')}
              </Link>

              <Link to="/catalog" className="nav-link">
                <img alt="" src={catalogIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.catalog')}
              </Link>

              {(!(localStorage.getItem("currentUser")?.includes("admin"))) &&
                <Button onClick={() => props.setOpen("true")} aria-label="CartIcon">
                  <Badge badgeContent={parseInt(localStorage.getItem("amountInCart")!)} color="error">
                    <AddShoppingCartSharp />
                  </Badge>
                </Button>
              }
              </div>
              
              <div className='rightHeader'>
              <NavDropdown title={translate('nav.languaje')} id="idioma-dropdown" className="ms-auto">
                <Dropdown.Item as="button" onClick={() => chooseLanguageHandler('ES')}>
                  <img alt="" src={spanishIcon} width="20" height="20" className="d-inline-block align-top" />
                  Español
                </Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => chooseLanguageHandler('EN')}>
                  <img alt="" src={englishIcon} width="20" height="20" className="d-inline-block align-top" />
                  English
                </Dropdown.Item>
              </NavDropdown>

              {(localStorage.getItem("currentUser") === "not logged") &&
                <Link to="/signup" className="nav-link">
                  <img alt="" src={registerIcon} width="20" height="20" className="d-inline-block align-top" />
                  {translate('nav.register')}
                </Link>
              }

              {(localStorage.getItem("currentUser") === "not logged") &&
                <Link to="/login" className="nav-link">
                  <img alt="" src={loginIcon} width="20" height="20" className="d-inline-block align-top" />
                  {translate('nav.login')}
                </Link>
              }

              {(localStorage.getItem("currentUser") !== "not logged") &&
                <Link onClick={logOut} to="/login" className="nav-link">
                  <img alt="" src={logoutIcon} width="20" height="20" className="d-inline-block align-top" />
                  {translate('nav.logout')}
                </Link>
              }

              {(localStorage.getItem("currentUser") !== "not logged" && (localStorage.getItem("currentUser")?.includes("admin"))) &&
                <NavDropdown title={translate('nav.admin')} id="productos-admin-dropdown">
                  <Link to="/addProduct" className="Dropdown-item">
                    {translate('crud.add')}
                  </Link>
                  <Link to="/editProduct" className="Dropdown-item">
                    {translate('crud.update')}
                  </Link>
                  <Link to="/editProduct" className="Dropdown-item">
                    {translate('crud.delete')}
                  </Link>
                </NavDropdown>
              }

              {(localStorage.getItem("currentUser") !== "not logged" && !(localStorage.getItem("currentUser")?.includes("admin"))) &&
                <Link to="/orders" className="nav-link">
                  <img alt="" src={ordersIcon} width="25" height="25" className="d-inline-block align-top" />
                  {translate("nav.orders")}
                </Link>
              }

              {(localStorage.getItem("currentUser") !== "not logged" && !(localStorage.getItem("currentUser")?.includes("admin"))) &&
                <Link to="/account" className="nav-link">
                  <img alt="" src={userIcon} width="25" height="25" className="d-inline-block align-top" />
                  Mi cuenta
                </Link>
              }

              {(localStorage.getItem("currentUser") !== "not logged" && (localStorage.getItem("currentUser")?.includes("admin"))) &&
                <Link to="/users" className="nav-link">
                  <img alt="" src={userListIcon} width="25" height="25" className="d-inline-block align-top" />
                  Usuarios
                </Link>
              }
              </div>

            </Fragment>
            </div>
          }
        </Nav>
      </div>
    </div>
  );
}
export default Header;