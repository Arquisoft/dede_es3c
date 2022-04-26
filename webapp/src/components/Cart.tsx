import { useContext } from "react";
import { Button } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { Product } from '../shared/shareddtypes';
import { LangContext } from '../lang';
import Swal from 'sweetalert2';
import { getStockByProduct } from '../api/api';

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

    async function checkGlobalStock() {
        let enoughStock = true;

        props.cartItems.forEach(async element => {
            //const stockAux = await getStockByProduct(element.name);

            const stockAux = 5;

            if (element.amount > stockAux){
                enoughStock = false;

                await Swal.fire({
                    title: "Error",
                    text: "No hay suficiente stock de algunos productos.",
                    icon: "error",
                });
            }
            
        });

        if (enoughStock) {
            window.location.assign("/shipping")
        }
    }

    async function calculateProductStock(name: string, amount: number) {
        if (amount <= await getStockByProduct(name)){
            return true;
        }
        
        return false;
    }

    return (
        <div>
            <h2 aria-label="cartTitle">{translate('cart.title')}</h2>
            {props.cartItems.length === 0 ? <p>{translate('cart.empty')}</p> : null}
            {props.cartItems.map((item: Product) =>
                <CartItem
                    key={item.name}
                    item={item}
                    setAmount={props.setAmount}
                />
            )}
            <h2>Subtotal: $ {calculateSubTotal(props.cartItems).toFixed(2)}</h2>
            <h2>{translate('cartItem.total')}: $ {calculateTotal(props.cartItems).toFixed(2)}</h2>
            <Button onClick={() => checkGlobalStock() } disabled={localStorage.getItem("currentUser") === "not logged"}>{translate('cart.orderButton')}</Button>
        </div>
    )
}

export default Cart;