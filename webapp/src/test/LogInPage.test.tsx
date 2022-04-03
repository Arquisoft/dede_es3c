import { render, screen } from "@testing-library/react";
import LoginPage from '../pages/LoginPage';
import LangState from "../lang";
import UserState from "../lang";
import React from "react";

beforeAll(async () => {
});

afterAll(async () => {

});

test('check login page text renders properly (english)', async () => {
    localStorage.setItem('currentUser', "not logged");

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <LoginPage setUser={() => "not logged"} />
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByAltText(/LogoLogIn/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Log in DeDesktop/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Please, enter your user and password/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/User: /i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Password: /i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/LoginButton/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Don't have an account\? Sign Up/i);
    expect(linkElement).toBeInTheDocument();
});