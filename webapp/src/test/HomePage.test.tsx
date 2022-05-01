import { render, screen } from "@testing-library/react";
import HomePage from '../pages/HomePage';
import React from "react";
import LangState from '../lang';
import UserState from '../User';

test('Home renders properly', () => {
  render(
    <React.StrictMode>
      <UserState>
        <LangState>
          <HomePage setUser={() => undefined} />
        </LangState>
      </UserState>
    </React.StrictMode>,
  );

  let linkElement = screen.getByLabelText(/carouselImage1/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByLabelText(/carouselImage2/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Catalog/i);
  expect(linkElement).toBeInTheDocument();
});