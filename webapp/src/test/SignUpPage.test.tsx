import { render, screen } from "@testing-library/react";
import SignUpPage from '../pages/SignUpPage';
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import OpenState from '../OpenCart';
import { MemoryRouter as Router } from 'react-router-dom';

test('check signup page text renders properly (english)', async () => {
    localStorage.setItem('currentUser', "not logged");
    
    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <OpenState>
                        <Router>
                            <SignUpPage setUser={() => "not logged"} />
                        </Router>
                    </OpenState>
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/Sign up in DeDesktop/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Please, fill the following requirements/i);
    expect(linkElement).toBeInTheDocument();
});