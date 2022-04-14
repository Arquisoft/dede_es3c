import React from "react";
import { render, screen } from "@testing-library/react";
import Header from '../components/Header';
import LangState from '../lang';
import UserState from '../User';

test('Header renders properly with client user logged', async () => {

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <Header setUser={() => "user"} />
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/DeDesktop/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Catalog/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Logout/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/My orders/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Language/i);
    expect(linkElement).toBeInTheDocument();

});

test('Header renders properly with admin user logged', async () => {
    localStorage.setItem('currentUser', "admin");

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <Header setUser={() => "admin"} />
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/DeDesktop/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Catalog/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Logout/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Edit products/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Language/i);
    expect(linkElement).toBeInTheDocument();

});

test('Header renders properly without user logged', async () => {
    localStorage.setItem('currentUser', "not logged");

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <Header setUser={() => "not logged"} />
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/DeDesktop/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Catalog/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Register/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Language/i);
    expect(linkElement).toBeInTheDocument();

});