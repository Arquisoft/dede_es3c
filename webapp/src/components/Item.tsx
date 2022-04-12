import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardContent from '@mui/material/CardContent';
import { CartProduct } from '../shared/shareddtypes'


type Props = {
    item: CartProduct;
    handleAddToCart: (clickedItem: CartProduct) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <div>
        <Card key={item.name}>
            <CardHeader title={item.name} />
            <CardMedia component="img" width="200" height="200" src={item.urlPhoto} alt={item.name} />
            <CardContent>
                $ {item.price}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to cart" disableFocusRipple size="small" onClick={() => handleAddToCart(item)}>
                    {
                        (!localStorage.getItem("currentUser")?.includes("admin")) &&
                        <AddShoppingCartIcon />
                    }
                </IconButton>
            </CardActions>
        </Card>
    </div>
);

export default Item;