import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardContent from '@mui/material/CardContent';
import { Product } from '../shared/shareddtypes';
import handleAddToCart from '../components/HandleAddToCart';
import { Grid } from "@mui/material";

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const ItemDetails: React.FC<Props> = ({ item, setAmount }) => (
    /*<div>
        <Card key={item.name}>
            <CardHeader title={item.name} />
            <CardMedia component="img" width="200" height="200" src={item.urlPhoto} alt={item.name} />
            <CardContent>
                {item.description}
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
    </div>*/

    <div>
        <h1>{item.name}</h1>
        <Grid container  xs={12} sm={4}>
            <img src={item.urlPhoto} width="500" height="500"/>
            <p>{item.description}</p>
            <IconButton aria-label="add to cart" disableFocusRipple size="small" onClick={() => handleAddToCart(item, setAmount)}>
                {
                    (!localStorage.getItem("currentUser")?.includes("admin")) &&
                    <AddShoppingCartIcon />
                }
            </IconButton>
        </Grid>
    </div>
);

export default ItemDetails;