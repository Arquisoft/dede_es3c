import { useState, useEffect, useContext } from 'react';
import { getProducts, getProductsByName, getProductsByCategory } from '../api/api';
import { Form, FormControl } from "react-bootstrap";
import Button from '@mui/material/Button';
import { LangContext } from '../lang';
import { Product, CartProduct } from '../shared/shareddtypes';
import Item from '../components/Item';
import { Drawer, Grid, Badge } from "@mui/material";
import Cart from '../components/Cart';
import { AddShoppingCartSharp } from '@mui/icons-material';

interface CatalogPageProps {
    setUser: (user: string) => void
}

const Catalog = (props: CatalogPageProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [val, setVal] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);

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
        setCartItems(JSON.parse(localStorage.getItem("cart")!) || []);
    }, []);

    const getTotalItems = (items: CartProduct[]) => items.reduce((ack: number, item) => ack + item.amount, 0);     

    const handleAddToCart = (clickedItem: CartProduct) => {
        let cartCopy = [...cartItems];

        let { name } = clickedItem;

        let existingItem = cartCopy.find(cartItem => cartItem.name === name);

        if (existingItem) {
            existingItem.amount = existingItem.amount + 1;
        } else {
            clickedItem.amount = 1;
            cartCopy.push(clickedItem)
        }

        setCartItems(cartCopy)

        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart)
    };

    const handleRemoveFromCart = (name: string) => {
        let cartCopy = [...cartItems]

        let existingItem = cartCopy.find(cartItem => cartItem.name === name);

        if (existingItem) {
            if (existingItem.amount > 1){
                existingItem.amount = existingItem.amount - 1;
            } else{
                cartCopy = cartCopy.filter(item => item.name !== name);
            }
            
        }

        setCartItems(cartCopy);

        let cartString = JSON.stringify(cartCopy)
        localStorage.setItem("cart", cartString)
    };

    return (
        <div>
            <Form>
                <FormControl type="search" value={val} placeholder={translate('catalog.search')} className="me-2" aria-label="Search" onChange={e => {setNameFilter(e.target.value); setVal(e.target.value)}}/>
                <Button onClick={() => FilterByName(nameFilter)} >{translate('catalog.search')}</Button>
            </Form>

            <Button onClick={() => { reloadItems(); setVal("") }}>{translate('category.reset')}</Button>
            <Button onClick={() => FilterByCategory("Monitors")}>{translate('category.monitors')}</Button>
            <Button onClick={() => FilterByCategory("Laptop")}>{translate('category.laptop')}</Button>

            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <Button onClick={() => setCartOpen(true)} aria-label="CartIcon">
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