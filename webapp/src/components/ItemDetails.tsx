import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Product } from '../shared/shareddtypes';
import handleAddToCart from '../components/HandleAddToCart';
import { Grid } from "@mui/material";

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const ItemDetails: React.FC<Props> = ({ item, setAmount }) => (
    <div>
        <h1>{item.name}</h1>
        <Grid container  xs={12} sm={4}>
            <img alt={item.name} src={item.urlPhoto} width="500" height="500"/>
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