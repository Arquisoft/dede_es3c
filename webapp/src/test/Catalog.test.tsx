import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { useState, useEffect, useContext } from 'react';
import LangState_, { LangContext } from '../lang';
import CatalogPage from '../pages/CatalogPage';
import { AutoFixHigh } from "@mui/icons-material";
import { UserContext } from '../User';

import en from '../langs/en.json';

beforeAll(async () => {
    
});

afterAll(async () => {
    
});

test('check that nav renders properly', async () => {
    render(<CatalogPage />)
    const linkElement = screen.getByText(/DeDesktop/i);
    expect(linkElement).toBeInTheDocument();
});