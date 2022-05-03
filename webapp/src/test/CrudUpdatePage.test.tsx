import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import CrudUpdatePage from "../pages/CrudEditPage";
import { MemoryRouter as Router } from 'react-router-dom';

test('Update product page renders properly as admin', async () => {
    localStorage.setItem('currentUser', "admin");

    render(
        <React.StrictMode>
            <Router>
            <UserState>
                <LangState>
                    <CrudUpdatePage setUser={() => "admin"} />
                </LangState>
            </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/updateProductTitle/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Name */i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Description */i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Price */i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Photo URL */i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/updateButton/i);
    expect(linkElement).toBeInTheDocument();
});

test('Add product page renders properly as client', async () => {
    localStorage.setItem('currentUser', "user");

    render(
        <React.StrictMode>
            <Router>
            <UserState>
                <LangState>
                    <CrudUpdatePage setUser={() => "admin"} />
                </LangState>
            </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElements = screen.getAllByLabelText(/carouselImage1/i);
    expect(linkElements[0]).toBeInTheDocument();
    linkElements = screen.getAllByLabelText(/carouselImage2/i);
    expect(linkElements[0]).toBeInTheDocument();
});