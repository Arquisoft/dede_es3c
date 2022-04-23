import { Product } from '../shared/shareddtypes';
import { useContext } from "react";
import { LangContext } from '../lang';
import { Button } from '@mui/material';
import handleAddToCart from '../components/HandleAddToCart';
import handleRemoveFromCart from '../components/HandleRemoveFromCart';

type CartItemProps = {
    item: Product;
    setAmount: (amount: string) => void
};

const CartItem: React.FC<CartItemProps> = ({ item, setAmount}) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const addToCart = handleAddToCart;
    const removeFromCart = handleRemoveFromCart;

    return(
    <div>
        <div>
            <h3>{item.name}</h3>
            <div className="information">
                <p>{translate('cartItem.price')}: $ {item.price}</p>
                <p>Subtotal: $ {(item.price * item.amount).toFixed(2)}</p>
                <p>{translate('cartItem.total')}: $ {(item.price * item.amount * 1.21).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => removeFromCart(item.name, setAmount)}
                > - </Button>
                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => addToCart(item, setAmount)}
                > + </Button>
            </div>
        </div>
        <img src={item.urlPhoto} alt={item.name} width="200" height="200"/>
    </div>
    )
    };

export default CartItem;