import DisplayProducts from '../components/DisplayProducts';
import { useState, useEffect, useContext } from 'react';
import { getProducts, getProductsByName, getProductsByCategory } from '../api/api';
import Header from "../components/Header";
import { Dropdown, DropdownButton, Form, FormControl } from "react-bootstrap";
import Button from '@mui/material/Button';
import { LangContext } from '../lang';
import { Product, CartProduct } from '../shared/shareddtypes';
import Item from '../components/Item';
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import Cart from '../components/Cart';
import { AddShoppingCartSharp } from "@material-ui/icons";

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

    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartProduct[]);

    const getTotalItems = (items: CartProduct[]) => items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartProduct) => {
        setCartItems(prev => {
            const isItemInCart = prev.find(item => item.name === clickedItem.name);

            if (isItemInCart) {
                return prev.map(item =>
                    item.name === clickedItem.name ? { ...item, amount: item.amount + 1 } : item
                )
            }
            
            return [...prev, { ...clickedItem, amount: 1 }]
        })
    };

    const handleRemoveFromCart = (name: string) => {
        setCartItems(prev => (
            prev.reduce((ack, item) => {
                if (item.name === name) {
                    if (item.amount === 1) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as CartProduct[])
        ))
    };

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

            {/*<DisplayProducts products={products} />*/}

            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <Button onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCartSharp />
                </Badge>
            </Button>

            <Grid container spacing={3}>
                {products?.map((item: CartProduct) => {
                    return (
                        <Grid item key={item.name} xs={12} sm={4}>
                            <Item item={item} handleAddToCart={handleAddToCart} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};
export default Catalog;