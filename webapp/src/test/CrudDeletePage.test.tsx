import { render, screen } from "@testing-library/react";
import OrdersPage from '../pages/OrdersPage';
import LangState from "../lang";
import UserState from "../lang";
import React from "react";
import { CartProduct } from "../shared/shareddtypes";
import CrudDeletePage from "../pages/CrudDeletePage";

beforeAll(async () => {
});

afterAll(async () => {

});

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

    let linkElement = screen.getByText(/DeDesktop is the result of the effort and dedication of the es3c group of the Software Architecture subject./i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/See all our products in our catalog/i);
    expect(linkElement).toBeInTheDocument();
});