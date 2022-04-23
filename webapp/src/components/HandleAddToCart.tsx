import { Product } from '../shared/shareddtypes';

const getTotalItems = (items: Product[]) => items.reduce((ack: number, item) => ack + item.amount, 0);

const handleAddToCart = (clickedItem: Product, setAmount: (amount: string) => void, itemAmount: string) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")!)

    let cartCopy = [...cartItems];

    let { name } = clickedItem;

    let existingItem = cartCopy.find(cartItem => cartItem.name === name);

    if (existingItem) {
        for (let i = 0; i < parseInt(itemAmount); i++) {
            existingItem.amount = existingItem.amount + 1;
        }
    } else {
        clickedItem.amount = parseInt(itemAmount);
        cartCopy.push(clickedItem)
    }

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart)

    cartItems = JSON.parse(localStorage.getItem("cart")!);
    
    setAmount(getTotalItems(cartItems).toString());
};

export default handleAddToCart;