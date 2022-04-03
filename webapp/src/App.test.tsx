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
  const linkElement = screen.getByText(/DeDesktop is the result of the effort and dedication of the es3c group of the Software Architecture subject./i);
  expect(linkElement).toBeInTheDocument();
});
