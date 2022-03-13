import DisplayProducts from '../components/DisplayProducts';
import { useState, useEffect, useContext } from 'react';
import { Product } from '../shared/shareddtypes';
import { getProducts, getProductsByName, getProductsByCategory } from '../api/api';
import Header from "../components/Header";
import { Dropdown, DropdownButton, Form, FormControl } from "react-bootstrap";
import Button from '@mui/material/Button';
import { LangContext } from '../lang';

interface DisplayPageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

const Catalog = (props: DisplayPageProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
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
                <FormControl type="search" placeholder={translate('catalog.search')} className="me-2" aria-label="Search" />
                <Button onClick={() => FilterByName("HP Monitor")} >{translate('catalog.search')}</Button>
            </Form>

            <DropdownButton title="Selecciona una categoría">
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => reloadItems()}>{translate('category.reset')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => FilterByCategory("Monitors")}>{translate('category.monitors')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => FilterByCategory("Laptop")}>{translate('category.laptop')}</Dropdown.Item>
                </Dropdown.Menu>
            </DropdownButton>

            <DisplayProducts products={products} />
        </div>
    );
};
export default Catalog;