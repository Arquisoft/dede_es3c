import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import LangState from '../lang';
import UserState from '../User';
import OpenState from '../OpenCart';

test('App (Home) renders properly without user logged', () => {
  localStorage.setItem('currentUser', "not logged");
  
  render(
    <React.StrictMode>
      <UserState>
        <LangState>
          <OpenState>
            <App />
          </OpenState>
        </LangState>
      </UserState>
    </React.StrictMode>,
  );

  let linkElement = screen.getByText(/DeDesktop is the result of the effort and dedication of the es3c group of the Software Architecture subject./i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/See all our products in our catalog/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Don't have an account\? Register/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Already have an account\? Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('App (Home) renders properly with user logged', () => {
  render(
    <React.StrictMode>
      <UserState>
        <LangState>
          <OpenState>
            <App />
          </OpenState>
        </LangState>
      </UserState>
    </React.StrictMode>,
  );

  let linkElement = screen.getByText(/DeDesktop is the result of the effort and dedication of the es3c group of the Software Architecture subject./i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/See all our products in our catalog/i);
  expect(linkElement).toBeInTheDocument();
});