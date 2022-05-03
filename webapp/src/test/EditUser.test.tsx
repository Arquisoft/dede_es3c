import { fireEvent, render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import { MemoryRouter as Router } from 'react-router-dom';
import EditUserPage from "../pages/EditUserPage";

test('Client view page renders properly when trying to change username', async () => {
    localStorage.setItem('currentUser', "user");

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <EditUserPage setUser={() => "user"} />
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
    linkElement = screen.getByText(/Change username/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Change password/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Back to catalog/i);
    expect(linkElement).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button', {name: "Change username"}));
    linkElement = screen.getByText(/Introduce your new username/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Actual:/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/COMMIT CHANGES/i);
    expect(linkElement).toBeInTheDocument();
});

test('Client view page renders properly when trying to change password', async () => {
    localStorage.setItem('currentUser', "user");

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <EditUserPage setUser={() => "user"} />
                    </LangState>
                </UserState>
            </Router>
        </React.StrictMode>,
    )

    fireEvent.click(screen.getByRole('button', {name: "Change password"}));
    let linkElement = screen.getByText(/Introduce your new password/i);
    expect(linkElement).toBeInTheDocument();
    
    linkElement = screen.getByText(/COMMIT CHANGES/i);
    expect(linkElement).toBeInTheDocument();
});

test('There is no one logged', async () => {
    localStorage.setItem('currentUser', "not logged");

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <EditUserPage setUser={() => "not logged"} />
                    </LangState>
                </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/You are not logged/i);
    linkElement = screen.getByText(/You are not logged/i);
    expect(linkElement).toBeInTheDocument();
});
