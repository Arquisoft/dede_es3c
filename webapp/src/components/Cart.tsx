import { useContext } from "react";
import { Button } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { CartProduct } from '../shared/shareddtypes';
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { LangContext } from '../lang';

type CartProps = {
    cartItems: CartProduct[];
    addToCart: (clickedItem: CartProduct) => void;
    removeFromCart: (name: string) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, addToCart, removeFromCart }) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [page, setPage] = useState('');

    if (page === 'shipping') {
        return (
            <Navigate to="/shipping" />
        )
    }

    const calculateTotal = (items: CartProduct[]) => {
        return items.reduce((ack: number, item) => ack + (item.amount * item.price), 0)
    }

    return (
        <div>
            <h2>{translate('cart.title')}</h2>
            {cartItems.length === 0 ? <p>{translate('cart.empty')}</p> : null}
            {cartItems.map((item: CartProduct) =>
                <CartItem
                    key={item.name}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            )}
            <h2>Total: $ {calculateTotal(cartItems).toFixed(2)}</h2>
            <Button onClick={() => setPage('shipping')}>{translate('cart.orderButton')}</Button>
        </div>
    )
}

export default Cart;