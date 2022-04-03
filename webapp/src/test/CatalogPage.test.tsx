import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import CatalogPage from '../pages/CatalogPage';
import LangState from '../lang';
import UserState from '../User';
import { Product, CartProduct } from '../shared/shareddtypes';

import en from '../langs/en.json';
import HomePage from "../pages/HomePage";

beforeAll(async () => {
    
});

afterAll(async () => {
    
});

test('Catalog renders properly', async () => {
  
  render(
        <React.StrictMode>
        <UserState>
        <LangState>
          <CatalogPage setUser={() => "user"} /*productsAux={productList}*//>
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

  linkElement = screen.getByLabelText(/CartIcon/i);
  expect(linkElement).toBeInTheDocument();
});
