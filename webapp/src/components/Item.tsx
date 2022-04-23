import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardContent from '@mui/material/CardContent';
import { Product } from '../shared/shareddtypes';
import { Link } from 'react-router-dom';
import handleAddToCart from '../components/HandleAddToCart';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const Item: React.FC<Props> = ({ item, setAmount}) => (
    <div>
        <Card key={item.name}>
            <CardHeader title={item.name} />
            <Link to={"/products/name/" + item.name} className="nav-link">
                <CardMedia component="img" width="200" height="200" src={item.urlPhoto} alt={item.name} />
            </Link>
            <CardContent>
                $ {item.price}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to cart" disableFocusRipple size="small" onClick={() => handleAddToCart(item, setAmount)}>
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