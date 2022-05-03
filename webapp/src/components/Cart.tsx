import { useContext } from "react";
import { Button } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { Product } from '../shared/shareddtypes';
import { LangContext } from '../lang';
import HorizontalSeparator from "./HorizontalSeparator";
import '../styles/Cart.scss';

type CartProps = {
    setOpen: (open: string) => void
    setAmount: (amount: string) => void
    cartItems: Product[];
}

const Cart: React.FC<CartProps> = (props: CartProps) => {
    const { dispatch: { translate } } = useContext(LangContext);

    const calculateSubTotal = (items: Product[]) => {
        return items.reduce((ack: number, item) => ack + (item.amount * item.price), 0)
    }

    const calculateTotal = (items: Product[]) => {
        return items.reduce((ack: number, item) => ack + (item.amount * item.price * 1.21), 0)
    }

    return (
        <div className="cartContainer">
            <h2 aria-label="cartTitle">{translate('cart.title')}</h2>

            <HorizontalSeparator />

            {props.cartItems.length === 0 ? <p>{translate('cart.empty')}</p> : null}
            {props.cartItems.map((item: Product) =>
                <div>
                    <CartItem
                        key={item.name}
                        item={item}
                        setAmount={props.setAmount}
                    />
                    <HorizontalSeparator />
                </div>
            )}

            <h2>Subtotal: $ {calculateSubTotal(props.cartItems).toFixed(2)}</h2>
            <h2>{translate('cartItem.total')}: $ {calculateTotal(props.cartItems).toFixed(2)}</h2>
            <Button
                style={{
                    borderRadius: 15,
                    backgroundColor: "#e8e8e8",
                    padding: "18px 36px",
                    fontSize: "18px",
                    color: "black"
                }}
                className="confirmButton"
                onClick={() => window.location.assign("/shipping") }
                disabled={localStorage.getItem("currentUser") === "not logged"}
            >{translate('cart.orderButton')}</Button>
        </div>
    )
}

export default Cart;