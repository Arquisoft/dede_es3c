import React from "react";
import { render, screen } from "@testing-library/react";
import CatalogPage from '../pages/Catalog';
import LangState from '../lang';
import UserState from '../User';

test('Catalog renders properly', async () => {
  
  render(
        <React.StrictMode>
        <UserState>
        <LangState>
          <CatalogPage setUser={() => "user"} setAmount={() => undefined} /*productsAux={productList}*//>
        </LangState>
        </UserState>
      </React.StrictMode>,
    )

  let linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText(/Reset selection/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText(/Monitors/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText(/Laptop/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByPlaceholderText(/Search/i);
  expect(linkElement).toBeInTheDocument();
});
