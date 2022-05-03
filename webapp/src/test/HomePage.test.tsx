import { render, screen } from "@testing-library/react";
import HomePage from '../pages/HomePage';
import React from "react";
import LangState from '../lang';
import UserState from '../User';
import { MemoryRouter as Router } from 'react-router-dom';

test('Home renders properly', () => {
  render(
    <React.StrictMode>
      <Router>
      <UserState>
        <LangState>
          <HomePage setUser={() => undefined} />
        </LangState>
      </UserState>
      </Router>
    </React.StrictMode>,
  );

  let linkElements = screen.getAllByText(/carouselImage1/i);
  expect(linkElements[0]).toBeInTheDocument();
  linkElements = screen.getAllByText(/carouselImage2/i);
  expect(linkElements[0]).toBeInTheDocument();
});