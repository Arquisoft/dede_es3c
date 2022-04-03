import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import CrudAddPage from "../pages/CrudAddPage";

test('Add product page renders properly as admin', async () => {
    localStorage.setItem('currentUser', "admin");
    
    render(
    <React.StrictMode>
        <UserState>
            <LangState>
                <CrudAddPage setUser={() => "admin"} />
            </LangState>
        </UserState>
    </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/addProductTitle/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Name */i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Description */i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Price */i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Photo URL */i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/addButton/i);
    expect(linkElement).toBeInTheDocument();
});

test('Add product page renders properly as client', async () => {
    localStorage.setItem('currentUser', "user");

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <CrudAddPage setUser={() => "user"} />
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/DeDesktop is the result of the effort and dedication of the es3c group of the Software Architecture subject./i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/See all our products in our catalog/i);
    expect(linkElement).toBeInTheDocument();
});