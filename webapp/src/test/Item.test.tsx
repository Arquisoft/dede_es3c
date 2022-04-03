import { render, screen } from "@testing-library/react";
import React from "react";
import { CartProduct } from "../shared/shareddtypes";
import Item from "../components/Item";

test('Item renders properly', async () => {
    const product: CartProduct = {name: "NombrePrueba", description: "DescripcionPrueba", price: 1, category: "CategoriaPrueba", urlPhoto: "urlPrueba", amount: 2};
    
    render(
        <Item item={product} handleAddToCart={() => undefined}/>
    )

    let linkElement = screen.getByText(/NombrePrueba/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByAltText(/NombrePrueba/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/\$ 1/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/add to cart/i);
    expect(linkElement).toBeInTheDocument();
});