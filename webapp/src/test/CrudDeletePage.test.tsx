import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import CrudDeletePage from "../pages/CrudDeletePage";

test('Delete product page renders properly as admin', async () => {
    localStorage.setItem('currentUser', "admin");

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <CrudDeletePage setUser={() => "admin"} />
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/deleteProductTitle/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/ID */i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/deleteButton/i);
    expect(linkElement).toBeInTheDocument();
});

test('Add product page renders properly as client', async () => {
    localStorage.setItem('currentUser', "user");

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <CrudDeletePage setUser={() => "admin"} />
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/carouselImage1/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/carouselImage2/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Catalog/i);
    expect(linkElement).toBeInTheDocument();
});