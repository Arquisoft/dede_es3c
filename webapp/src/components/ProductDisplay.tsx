import { LocalFireDepartmentRounded } from '@mui/icons-material';
import React, { useState } from 'react';
import { getProducts } from "../api/api";
import { Product } from '../shared/shareddtypes';

function JsonDataDisplay() {
    
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = async () => {
        const productsAux: Product[] = await getProducts();
        setProducts(productsAux);
    };

    const DisplayData = products.map(
        (info) => {
            return (
                <tr>
                    <td>{info.name}</td>
                    <td>{info.description}</td>
                    <td>{info.price}</td>
                </tr>
            )
        }
    )

    return(
        <div>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>                    
                    {DisplayData}
                </tbody>
            </table>
        </div>
    )
}
export default JsonDataDisplay;