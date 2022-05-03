import { Product } from '../shared/shareddtypes';
import { useContext, useEffect, useState } from "react";
import { LangContext } from '../lang';
import { Button } from '@mui/material';
import handleAddToCart from '../components/HandleAddToCart';
import handleRemoveFromCart from '../components/HandleRemoveFromCart';
import { getStockByProduct } from '../api/api';
import '../styles/Cart.scss';

type CartItemProps = {
    item: Product;
    setAmount: (amount: string) => void
};

const CartItem: React.FC<CartItemProps> = ({ item, setAmount }) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const addToCart = handleAddToCart;
    const removeFromCart = handleRemoveFromCart;
    const [stock, setStock] = useState<number>(0);

    useEffect(() => {
        const calculateStock = async () => {
            try{
                setStock(await getStockByProduct(item.name));
            } catch (error) {
                console.log("Error al recuperar el stock del producto " + item.name);
            }
        }

        calculateStock();
    }, [item.name]);

    return(
        <div>
            <div className='cartItem'>
                <div className='cartItemDetails'>
                        <h3 className='cartItemItemName'>{item.name}</h3>
                        <div className="information">
                            <p>{translate('cartItem.price')}: $ {item.price}</p>
                            <p>Subtotal: $ {(item.price * item.amount).toFixed(2)}</p>
                            <p>{translate('cartItem.total')}: $ {(item.price * item.amount * 1.21).toFixed(2)}</p>
                        </div>
                </div>
                
                <div className='cartItemContainer'>
                    <img src={item.urlPhoto} alt={item.name} width="200" height="200" className='cartItemImage' />

                    <div className='cartItemButtons'>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => removeFromCart(item.name, setAmount)}
                            className="cartItemLeftButton"
                            style={{
                                borderRadius: 15,
                                padding: "5px 10px",
                                fontSize: "15px",
                            }}
                        > - </Button>
                        <p className="cartItemAmount">{item.amount}</p>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => addToCart(item, setAmount, '1', stock)}
                            style={{
                                borderRadius: 15,
                                padding: "5px 10px",
                                fontSize: "15px",
                            }}
                        > + </Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CartItem;