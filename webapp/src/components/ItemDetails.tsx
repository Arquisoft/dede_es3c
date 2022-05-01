import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Product } from '../shared/shareddtypes';
import handleAddToCart from '../components/HandleAddToCart';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import { getStockByProduct } from '../api/api';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button'; 

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const ItemDetails: React.FC<Props> = ({ item, setAmount }) => {
    const [itemAmount, setItemAmount] = useState<string>('0');
    const [stock, setStock] = useState<number>(0);

    const handleChange = (event: SelectChangeEvent) => {
        setItemAmount(event.target.value as string);
    };

    useEffect(() => {
        const calculateStock = async () => {
            setStock(await getStockByProduct(item.name));
        }

        calculateStock();
    }, [item.name]);

    return(
    <div>
        <h1>{item.name}</h1>
        <Grid container>
            <img alt={item.name} src={item.urlPhoto} width="500" height="500"/>
            <p>{item.description}</p>
                {
                    (!localStorage.getItem("currentUser")?.includes("admin")) &&
                <Box sx={{ minWidth: 70 }}>
                    <FormControl fullWidth>
                        <Select
                            value={itemAmount}
                            onChange={handleChange}
                            size="small"
                            displayEmpty
                            autoWidth
                        >
                            {Array.from({ length: stock + 1 }, (_, i) => <MenuItem value={i} key={i}>{i}</MenuItem>)}

                        </Select>
                    </FormControl>
                </Box>
}
            <IconButton aria-label="add to cart" disableFocusRipple size="small" onClick={() => handleAddToCart(item, setAmount, itemAmount, stock)}>
                {
                    (!localStorage.getItem("currentUser")?.includes("admin")) &&
                    <AddShoppingCartIcon />
                }
            </IconButton>
                <p>Stock: {stock}</p>
        </Grid>
    </div>
    );
};

export default ItemDetails;