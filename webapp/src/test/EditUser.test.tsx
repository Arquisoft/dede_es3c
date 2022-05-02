import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import { MemoryRouter as Router } from 'react-router-dom';
import EditUserPage from "../pages/EditUserPage";

test('Client view page renders properly', async () => {
    localStorage.setItem('currentUser', "admin");

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <EditUserPage setUser={() => "admin"} />
                    </LangState>
                </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/Personal Data/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Username/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Email/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Rol/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Change username/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Change password/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Back to catalog/i);
    expect(linkElement).toBeInTheDocument();
});
