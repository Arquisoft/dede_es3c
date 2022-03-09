import React, { useCallback, useState, useEffect, useRef, useContext, FC, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {Navbar, Form, Nav, Button} from "react-bootstrap";
import "bootswatch/dist/superhero/bootstrap.min.css"

import { LangContext } from '../lang';
import { render } from '@testing-library/react';
import { User } from '../shared/shareddtypes';

interface HeaderProps {
  setSession: (user: User) => void;
  fixed?: boolean;
  transparent?: boolean;
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const { state: { language}, dispatch: { setLanguage, translate } } = useContext(LangContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef<HTMLUListElement>(null);

  let headerClass = 'header';

  if(props.fixed) {
    headerClass += ' header--fixed';
  }

  if(props.transparent) {
    headerClass += ' header--transparent';
  }

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
    localStorage.removeItem("token");
  }
  if (localStorage.getItem("token") != undefined){
      return (
   <Navbar id="basic-navbar-nav">
    {
      <Nav>
        {
          <Fragment>
            <Button onClick={() => chooseLanguageHandler('EN')}>EN</Button>  
            <Button onClick={() => chooseLanguageHandler('ES')}>ES</Button> 
            <Nav.Item key = "home">
              <Nav.Link onClick={logOut} href = "/">
                Log out
              </Nav.Link>
              <Button>{localStorage.getItem("token")}</Button>
            </Nav.Item>
          </Fragment>
        }
      </Nav>
    }
</Navbar>
  );
  } else{
    return (
      <Nav>
      {
        <Fragment>
          <Button onClick={() => chooseLanguageHandler('EN')}>EN</Button>  
          <Button onClick={() => chooseLanguageHandler('ES')}>ES</Button> 
          <Nav.Item >
            <Nav.Link  onClick={() => logOut} href = "/login">
              Log in
            </Nav.Link>
          </Nav.Item>
        </Fragment>
      }
    </Nav>
    
 );}
}

export default Header;