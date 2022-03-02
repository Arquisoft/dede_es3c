import React, { useCallback, useState, useEffect, useRef, useContext, FC} from 'react'
import { render } from "@testing-library/react";
import { NavLink, Link } from 'react-router-dom';
import {LangContext} from '../lang';
import Welcome from "./Welcome";
import { stringify } from 'querystring';


test('check that everything is rendering propertly', async () => {
  const message:string = "students";
  const translate = (key:string) => "Hi, ";
  const { getByText } = render(<Welcome translate = {translate}  message={message}/>);
  expect(getByText('Hi, '+message)).toBeInTheDocument();
});