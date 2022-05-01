import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import { MemoryRouter as Router } from 'react-router-dom';
import ClientView from "../pages/ClientView";

test('Client view page renders properly', async () => {
    localStorage.setItem('currentUser', "admin");

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <ClientView setUser={() => "admin"} />
                    </LangState>
                </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/DeDesktop's registered clients/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Username/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Email/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Rol/i);
    expect(linkElement).toBeInTheDocument();
});
