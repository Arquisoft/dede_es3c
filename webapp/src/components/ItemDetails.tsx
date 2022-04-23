import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Product } from '../shared/shareddtypes';
import handleAddToCart from '../components/HandleAddToCart';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const ItemDetails: React.FC<Props> = ({ item, setAmount }) => {
    const [itemAmount, setItemAmount] = useState<string>('0');

    return(
    <div>
        <h1>{item.name}</h1>
        <Grid container  xs={12} sm={4}>
            <img alt={item.name} src={item.urlPhoto} width="500" height="500"/>
            <p>{item.description}</p>
            <TextField id="amount" label="Amount" variant="outlined" size="small" value={itemAmount} onChange={e => { setItemAmount(e.target.value) }} />
            <IconButton aria-label="add to cart" disableFocusRipple size="small" onClick={() => handleAddToCart(item, setAmount, itemAmount)}>
                {
                    (!localStorage.getItem("currentUser")?.includes("admin")) &&
                    <AddShoppingCartIcon />
                }
            </IconButton>
        </Grid>
    </div>
    );
};

export default ItemDetails;