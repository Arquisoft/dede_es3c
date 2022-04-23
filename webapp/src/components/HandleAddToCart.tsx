import { Product } from '../shared/shareddtypes';

const getTotalItems = (items: Product[]) => items.reduce((ack: number, item) => ack + item.amount, 0);

const handleAddToCart = (clickedItem: Product, setAmount: (amount: string) => void) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")!)

    let cartCopy = [...cartItems];

    let { name } = clickedItem;

    let existingItem = cartCopy.find(cartItem => cartItem.name === name);

    if (existingItem) {
        existingItem.amount = existingItem.amount + 1;
    } else {
        clickedItem.amount = 1;
        cartCopy.push(clickedItem)
    }

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart)

    cartItems = JSON.parse(localStorage.getItem("cart")!);
    
    setAmount(getTotalItems(cartItems).toString());
};

export default handleAddToCart;