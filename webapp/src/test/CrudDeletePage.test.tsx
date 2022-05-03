import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import CrudDeletePage from "../pages/CrudDeletePage";
import { MemoryRouter as Router } from 'react-router-dom';

test('Delete product page renders properly as admin', async () => {
    localStorage.setItem('currentUser', "admin");

    render(
        <React.StrictMode>
            <Router>
            <UserState>
                <LangState>
                    <CrudDeletePage setUser={() => "admin"} />
                </LangState>
            </UserState>
            </Router>
        </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/deleteProductTitle/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/deleteButton/i);
    expect(linkElement).toBeInTheDocument();
});

test('Add product page renders properly as client', async () => {
    localStorage.setItem('currentUser', "user");

    render(
        <React.StrictMode>
            <Router>
            <UserState>
                <LangState>
                    <CrudDeletePage setUser={() => "admin"} />
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