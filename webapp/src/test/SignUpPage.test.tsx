import { render, screen } from "@testing-library/react";
import SignUpPage from '../pages/SignUpPage';
import LangState from "../lang";
import UserState from "../lang";
import React from "react";

beforeAll(async () => {
});

afterAll(async () => {

});

test('check signup page text renders properly (english)', async () => {
    localStorage.setItem('currentUser', "not logged");
    
    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <SignUpPage setUser={() => "not logged"}/>
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/Sign up in DeDesktop/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Please, fill the following requirements/i);
    expect(linkElement).toBeInTheDocument();
});