import { Product } from '../shared/shareddtypes';
import Swal from 'sweetalert2';

const getTotalItems = (items: Product[]) => items.reduce((ack: number, item) => ack + item.amount, 0);

const handleAddToCart = async (clickedItem: Product, setAmount: (amount: string) => void, itemAmount: string, stock: number) => {
    
    if (itemAmount !== "0"){
        let showError = false;

        let cartItems = JSON.parse(localStorage.getItem("cart")!)

        let cartCopy = [...cartItems];

        let { name } = clickedItem;

        let existingItem = cartCopy.find(cartItem => cartItem.name === name);

        if (existingItem) {
            for (let i = 0; i < parseInt(itemAmount); i++) {
                if ((existingItem.amount + 1) <= stock) {
                    existingItem.amount = existingItem.amount + 1;
                }
                else {
                    showError = true;
                }
            }
        } else {
            clickedItem.amount = parseInt(itemAmount);
            cartCopy.push(clickedItem)
        }

        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart)

        cartItems = JSON.parse(localStorage.getItem("cart")!);

        setAmount(getTotalItems(cartItems).toString());

        if (showError) {
            await Swal.fire({
                title: "Error",
                text: "No se puede añadir " + clickedItem.name + " al carrito, no hay suficiente stock",
                icon: "error",
            });
        }
    }    
};

export default handleAddToCart;