import React from "react";
import { render, screen } from "@testing-library/react";
import CatalogPage from '../pages/Catalog';
import LangState from '../lang';
import UserState from '../User';
import { MemoryRouter as Router } from 'react-router-dom';

test('Catalog renders properly', async () => {
  
  render(
        <React.StrictMode>
          <Router>
        <UserState>
          <LangState>
            <CatalogPage setUser={() => "user"} setAmount={() => undefined} />
          </LangState>
        </UserState>
          </Router>
        
      </React.StrictMode>,
    )

  let linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByLabelText(/Search/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Monitors/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Laptops/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Chairs/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Keyboards/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByLabelText(/leftPrice/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByLabelText(/rightPrice/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByLabelText(/slider/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByLabelText(/priceFilterButton/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Reset filters/i);
  expect(linkElement).toBeInTheDocument();
});
