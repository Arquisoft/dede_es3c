import { render, screen } from "@testing-library/react";
import SignUpPage from '../pages/SignUpPage';
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import OpenState from '../OpenCart';
import { MemoryRouter as Router } from 'react-router-dom';
import LoginProvider from "../components/LoginProvider";

test('check the provider is correctly given', async () => { 
    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <OpenState>
                        <Router>
                            <LoginProvider/>
                        </Router>
                    </OpenState>
                </LangState>
            </UserState>
        </React.StrictMode>,
    )
    let linkElement = screen.getByText(/Log in/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Log in/i);
    expect(linkElement).toBeInTheDocument();
});