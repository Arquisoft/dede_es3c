import { render, screen } from "@testing-library/react";
import { Product } from "../shared/shareddtypes";
import Item from "../components/Item";
import { MemoryRouter as Router } from 'react-router-dom';

test('Item renders properly', async () => {
    const product: Product = {name: "NombrePrueba", description: "DescripcionPrueba", price: 1, category: "CategoriaPrueba", urlPhoto: "urlPrueba", amount: 2};
    
    render(
        <Router>
            <Item item={product} setAmount={() => undefined} stock={0}/>
        </Router>
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