import CartItem from "../components/CartItem";

import { Product, CartProduct } from '../shared/shareddtypes';

type Props = {
    cartItems: CartProduct[];
    addToCart: (clickedItem: CartProduct) => void;
    removeFromCart: (name: string) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartProduct[]) => {
        return items.reduce((ack: number, item) => ack + (item.amount * item.price), 0)
    }

    return (
        <div>
            <h2>Your Shopping Cart</h2>
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
        </div>
    )
}

export default Cart;