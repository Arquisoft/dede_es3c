import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import { Product } from "../shared/shareddtypes";
import ShippingPage from "../pages/ShippingPage";
import { MemoryRouter as Router } from 'react-router-dom';

test('Cart without items renders properly', async () => {
    const products: Product[] = [
        { name: "NombrePrueba1", description: "DescripcionPrueba1", price: 1, category: "CategoriaPrueba1", urlPhoto: "urlPrueba1", amount: 2 },
        { name: "NombrePrueba2", description: "DescripcionPrueba2", price: 2, category: "CategoriaPrueba2", urlPhoto: "urlPrueba2", amount: 2 },
    ];
    localStorage.setItem("cart", JSON.stringify(products));

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <Router>
                        <ShippingPage setUser={() => "user"} />
                    </Router>
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/Order Confirmation/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/selectedProductsTitle/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/selectedProductsSubtitle/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/x2 NombrePrueba1:1\$/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/x2 NombrePrueba2:2\$/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/Introduce your solid ID to select the shipping address/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/User: /i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Validate/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Country/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Locality/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Postal code/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/region/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/Street/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Proceed/i);
    expect(linkElement).toBeInTheDocument();
});