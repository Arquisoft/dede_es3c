import DisplayProducts from '../components/DisplayProducts';
import { useState, useEffect } from 'react';
import { Product } from '../shared/shareddtypes';
import { getProducts, getProductsByName, getProductsByCategory } from '../api/api';
import Header from "../components/Header";
import { Dropdown, DropdownButton, Form, FormControl } from "react-bootstrap";
import Button from '@mui/material/Button';

interface DisplayPageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

const Catalog = (props: DisplayPageProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    const reloadItems = async () => {
        setProducts(await getProducts());
    }

    async function FilterByName(name: string){
        setProducts(await getProductsByName(name));
    }

    async function FilterByCategory(category: string) {
        setProducts(await getProductsByCategory(category));
    }

    useEffect(() => {
        reloadItems();
    }, []);

    return (
        <div>
            <Header setUser={props.setUser} />

            <Form>
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <Button type="submit" onClick={() => FilterByName("HP Monitor")} >Search</Button>
            </Form>

            <DropdownButton title="Selecciona una categoría">
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => FilterByCategory("Monitors")}>Monitores</Dropdown.Item>
                    <Dropdown.Item onClick={() => FilterByCategory("Laptops")}>Laptops</Dropdown.Item>
                </Dropdown.Menu>
            </DropdownButton>

            <DisplayProducts products={products} />
        </div>
    );
};
export default Catalog;