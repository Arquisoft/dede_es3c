import React, { useCallback, useState, useEffect, useRef, useContext, FC, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import "bootswatch/dist/quartz/bootstrap.min.css";

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
    <header className={headerClass}>
      <Fragment>
      <button onClick={() => chooseLanguageHandler('EN')}>EN</button>  
      <button onClick={() => chooseLanguageHandler('ES')}>ES</button> 
      </Fragment> 
    </header>
  );
}

export default Header;