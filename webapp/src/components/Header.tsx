import React, { useCallback, useState, useEffect, useRef, useContext, FC, Fragment } from 'react';
import {Navbar, Nav, NavDropdown, Dropdown} from "react-bootstrap";
import "bootswatch/dist/morph/bootstrap.min.css"
import { LangContext } from '../lang';
import logo from '../img/logo-dede.svg';
import homeIcon from '../img/home-icon.svg';
import catalogIcon from '../img/catalog-icon.svg';
import englishIcon from '../img/english-icon.svg';
import loginIcon from '../img/login-icon.svg';
import logoutIcon from '../img/logout-icon.svg';
import shoppingCartIcon from '../img/shopping-cart-icon.svg';
import spanishIcon from '../img/spanish-icon.svg';
import registerIcon from '../img/register-icon.svg';

interface HeaderProps {
  setUser:(user:string) => void
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {dispatch: { setLanguage, translate } } = useContext(LangContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef<HTMLUListElement>(null);

  const handleClickOutside = useCallback((e) => {
    if(showDropdown && e.target.closest('.dropdown') !== dropdownEl.current) {
      setShowDropdown(false);
    }
  }, [showDropdown, setShowDropdown, dropdownEl]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [handleClickOutside]);


  const chooseLanguageHandler = (value: string) => {
    setShowDropdown(false);
    setLanguage(value);
  }

  const logOut = () => {
    localStorage.setItem("cart", "[]");
    localStorage.removeItem("token");
    props.setUser("not logged");
    console.log(localStorage.getItem("currentUser"))
  }

  if (localStorage.getItem("currentUser") !== "not logged" && !(localStorage.getItem("currentUser")?.includes("admin"))) {
      return (
        <Nav>
        {
          <Nav className="container-fluid">
            {
              <Fragment>
                <Navbar.Brand>
                  <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                  DeDesktop
                </Navbar.Brand>
                <Nav.Link href="/" className="float-left">
                  <img alt="" src={homeIcon} width="20" height="20" className="d-inline-block align-top" />
                  {translate('nav.home')}
                </Nav.Link>
                <Nav.Link href="/catalog">
                  <img alt="" src={catalogIcon} width="20" height="20" className="d-inline-block align-top" />
                  {translate('nav.catalog')}
                </Nav.Link>
                <Nav.Link onClick={logOut} href="/login">
                  <img alt="" src={logoutIcon} width="20" height="20" className="d-inline-block align-top" />
                  {translate('nav.logout')}
                </Nav.Link>
                <Nav.Link href="/orders">
                  <img alt="" src={logoutIcon} width="20" height="20" className="d-inline-block align-top" />
                  {translate("nav.orders")}
                </Nav.Link>
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
              </Fragment>
            }
          </Nav>
        }
      </Nav>
  );
  } else if (localStorage.getItem("currentUser") !== "not logged" && (localStorage.getItem("currentUser")?.includes("admin"))) {
      return (
        <Nav>
          {
            <Nav className="container-fluid">
              {
                <Fragment>
                  <Navbar.Brand>
                    <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
                    DeDesktop
                  </Navbar.Brand>
                  <Nav.Link href="/" className="float-left">
                    <img alt="" src={homeIcon} width="20" height="20" className="d-inline-block align-top" />
                    {translate('nav.home')}
                  </Nav.Link>
                  <Nav.Link href="/catalog">
                    <img alt="" src={catalogIcon} width="20" height="20" className="d-inline-block align-top" />
                    {translate('nav.catalog')}
                  </Nav.Link>
                  <NavDropdown title={translate('nav.admin')} id="productos-admin-dropdown">
                    <Dropdown.Item href="/addProduct">
                      {translate('crud.add')}
                    </Dropdown.Item>
                    <Dropdown.Item href="/editProduct">
                      {translate('crud.update')}
                    </Dropdown.Item>
                    <Dropdown.Item href="/deleteProduct">
                      {translate('crud.delete')}
                    </Dropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={logOut} href="/login">
                    <img alt="" src={logoutIcon} width="20" height="20" className="d-inline-block align-top" />
                    {translate('nav.logout')}
                  </Nav.Link>
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
                </Fragment>
              }
            </Nav>
          }
        </Nav>
      );
    } else{
    return (
      <Nav>
      {
        <Nav className="container-fluid">
          {
            <Fragment>
              <Navbar.Brand>
                <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                DeDesktop
              </Navbar.Brand>
              <Nav.Link href="/" className="float-left">
                <img alt="" src={homeIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.home')}
              </Nav.Link>
              <Nav.Link href="/catalog">
                <img alt="" src={catalogIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.catalog')}
              </Nav.Link>
              <Nav.Link href="/signup">
                <img alt="" src={registerIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.register')}
              </Nav.Link>
              <Nav.Link onClick={logOut} href="/login">
                <img alt="" src={loginIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.login')}
              </Nav.Link>
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
            </Fragment>
          }
        </Nav>
      }
    </Nav>
    
 );}
}
export default Header;