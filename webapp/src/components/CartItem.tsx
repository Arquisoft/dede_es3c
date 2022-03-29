import Button from "@material-ui/core/Button";

import { CartProduct } from '../shared/shareddtypes';

type Props = {
    item: CartProduct;
    addToCart: (clickedItem: CartProduct) => void;
    removeFromCart: (name: string) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <div>
        <div>
            <h3>{item.name}</h3>
            <div className="information">
                <p>Price: $ {item.price}</p>
                <p>Total: $ {(item.price + item.amount).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => removeFromCart(item.name)}
                > - </Button>
                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => addToCart(item)}
                > + </Button>
            </div>
        </div>
        <img src={item.urlPhoto} alt={item.name} width="200" height="200"/>
    </div>
);

export default CartItem;