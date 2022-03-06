import React, { useCallback, useState, useEffect, useRef, useContext, FC, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {Navbar, Form, Nav, Button} from "react-bootstrap";
import "bootswatch/dist/superhero/bootstrap.min.css"

import { LangContext } from '../lang';

interface HeaderProps {
  fixed?: boolean;
  transparent?: boolean;
}

const Header: FC<HeaderProps> = ({ fixed, transparent }) => {
  const { state: { language}, dispatch: { setLanguage, translate } } = useContext(LangContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef<HTMLUListElement>(null);

  let headerClass = 'header';

  if(fixed) {
    headerClass += ' header--fixed';
  }

  if(transparent) {
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

  return(

    <Navbar id="basic-navbar-nav">
      {
        <Nav>
          {
            <Fragment>
              <Button onClick={() => chooseLanguageHandler('EN')}>EN</Button>  
              <Button onClick={() => chooseLanguageHandler('ES')}>ES</Button> 
              <Nav.Item key = "home">
                <Nav.Link href = "/login">
                  Login
                </Nav.Link>
              </Nav.Item>
            </Fragment>
          }
        </Nav>
      }
  </Navbar>
  );
}

export default Header;