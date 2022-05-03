import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import { MemoryRouter as Router } from 'react-router-dom';
import ClientView from "../pages/ClientView";
import { User } from "../shared/shareddtypes";
import DisplayClients from "../components/DisplayClients";

test('Client view page renders properly without users', async () => {
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

test('Client view page renders properly with users', async () => {
    localStorage.setItem('currentUser', "admin");
    const user : User = {
        email: "email",
        password: "pass",
        rol:"Client",
        username:"user"
    }
    const users : User[] = [];
    users[0] = user;
    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <DisplayClients users={users}/>
                    </LangState>
                </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/user/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/user/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/email/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Client/i);
    expect(linkElement).toBeInTheDocument();
});

test('Client view page renders properly when no one is logged', async () => {
    localStorage.setItem('currentUser', "not logged");

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <ClientView setUser={() => "not logged"} />
                    </LangState>
                </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/Sorry, we couldn't find what you are looking for/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Sorry, we couldn't find what you are looking for/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Go Shopping/i);
});
