import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import CatalogPage from '../pages/CatalogPage';
import LangState from '../lang';
import UserState from '../User';

import en from '../langs/en.json';
import HomePage from "../pages/HomePage";

beforeAll(async () => {
    
});

afterAll(async () => {
    
});

test('check that nav renders properly', async () => {
    render(
        <React.StrictMode>
        <UserState>
        <LangState>
          <CatalogPage/>
        </LangState>
        </UserState>
      </React.StrictMode>,
    )
    const linkElement = screen.getByText(/Search/i);
    expect(linkElement).toBeInTheDocument();
});
