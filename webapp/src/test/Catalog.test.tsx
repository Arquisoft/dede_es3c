import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { useState, useEffect, useContext } from 'react';
import { LangContext } from '../lang';
import CatalogPage from '../pages/CatalogPage';
import { AutoFixHigh } from "@mui/icons-material";
import { UserContext } from '../User';

type aux = {
    translate: (key: string) => string
    setUser: (user: string) => void
}

beforeAll(async () => {
    
});

afterAll(async () => {
    
});

test('check that nav renders properly', async () => {
    const wrapper = mount(<CatalogPage setUser={setUser} translate={translate}/>);
    expect(wrapper.find('Results').length).toEqual(1);

    render(<CatalogPage translate={translate} setUser={setUser}/>);
    const linkElement = screen.getByText(/DeDesktop/i);
    expect(linkElement).toBeInTheDocument();
});