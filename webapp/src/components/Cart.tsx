import { useContext } from "react";
import { Button } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { LangContext } from "../lang";

import { CartProduct } from '../shared/shareddtypes';

type Props = {
    cartItems: CartProduct[];
    addToCart: (clickedItem: CartProduct) => void;
    removeFromCart: (name: string) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const {dispatch: {translate } } = useContext(LangContext);

    const calculateTotal = (items: CartProduct[]) => {
        return items.reduce((ack: number, item) => ack + (item.amount * item.price), 0)
    }

    return (
        <div>
            <h2>{translate("cart.title")}</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map((item: CartProduct) =>
                <CartItem
                    key={item.name}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            )}
            <h2>Total: $ {calculateTotal(cartItems).toFixed(2)}</h2>
            <Button href="/shipping" disabled = {cartItems.length === 0}> {translate("cart.pay")} </Button>
        </div>
    )
}

export default Cart;