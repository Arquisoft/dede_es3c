import React from "react";
import { render, screen } from "@testing-library/react";
import Header from '../components/Header';
import LangState from '../lang';
import UserState from '../User';
import { BrowserRouter as Router } from "react-router-dom";

test('Header renders properly with client user logged', async () => {
    localStorage.setItem('currentUser', "user");

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <Header setUser={() => undefined} setOpen={() => undefined} setAmount={() => undefined}/>
                    </LangState>
                </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/logoHeader/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/DeDesktop/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Catalog/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Cart/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/About us/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Language/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Logout/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/My orders/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/My account/i);
    expect(linkElement).toBeInTheDocument();

});

test('Header renders properly with admin user logged', async () => {
    localStorage.setItem('currentUser', "admin");

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <Header setUser={() => undefined} setOpen={() => undefined} setAmount={() => undefined} />
                    </LangState>
                </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/logoHeader/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/DeDesktop/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Catalog/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/About us/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Language/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Logout/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Edit products/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Users/i);
    expect(linkElement).toBeInTheDocument();

});

test('Header renders properly without user logged', async () => {
    localStorage.setItem('currentUser', "not logged");

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <Header setUser={() => undefined} setOpen={() => undefined} setAmount={() => undefined} />
                    </LangState>
                </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByAltText(/logoHeader/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/DeDesktop/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Catalog/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Cart/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/About us/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Language/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Register/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();

});