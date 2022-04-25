import { Product } from '../shared/shareddtypes';

const getTotalItems = (items: Product[]) => items.reduce((ack: number, item) => ack + item.amount, 0);

const handleRemoveFromCart = (name: string, setAmount: (amount: string) => void) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")!)

    let cartCopy = [...cartItems]

    let existingItem = cartCopy.find(cartItem => cartItem.name === name);

    if (existingItem) {
        if (existingItem.amount > 1) {
            existingItem.amount = existingItem.amount - 1;
        } else {
            cartCopy = cartCopy.filter(item => item.name !== name);
        }

    }

    let cartString = JSON.stringify(cartCopy)
    localStorage.setItem("cart", cartString)

    cartItems = JSON.parse(localStorage.getItem("cart")!);

    setAmount(getTotalItems(cartItems).toString());
};

export default handleRemoveFromCart;