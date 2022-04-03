import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import LangState from './lang';
import UserState from './User';

test('renders learn react link', () => {
  render(
    <React.StrictMode>
    <UserState>
    <LangState>
      <App />
    </LangState>
    </UserState>
  </React.StrictMode>,);
  const linkElement = screen.getByText(/Source code/i);
  expect(linkElement).toBeInTheDocument();
});
