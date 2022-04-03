import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { CartProduct } from '../shared/shareddtypes';
import { Navigate } from "react-router-dom";
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

    const calculateSubTotal = (items: CartProduct[]) => {
        return items.reduce((ack: number, item) => ack + (item.amount * item.price), 0)
    }

    const calculateTotal = (items: CartProduct[]) => {
        return items.reduce((ack: number, item) => ack + (item.amount * item.price * 1.21), 0)
    }

    return (
        <div>
            <h2 aria-label="cartTitle">{translate('cart.title')}</h2>
            {cartItems.length === 0 ? <p>{translate('cart.empty')}</p> : null}
            {cartItems.map((item: CartProduct) =>
                <CartItem
                    key={item.name}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            )}
            <h2>Subtotal: $ {calculateSubTotal(cartItems).toFixed(2)}</h2>
            <h2>{translate('cartItem.total')}: $ {calculateTotal(cartItems).toFixed(2)}</h2>
            <Button onClick={() => setPage("shipping")} disabled = {localStorage.getItem("currentUser") === "not logged"}>{translate('cart.orderButton')}</Button>
        </div>
    )
}

export default Cart;