import React, { useState, useEffect } from 'react';
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
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getStockByProduct } from '../api/api';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const Item = (props: Props) => {
    const [itemAmount, setItemAmount] = useState<string>('0');
    const [stock, setStock] = useState<number>(0);

    const handleChange = (event: SelectChangeEvent) => {
        setItemAmount(event.target.value as string);
    };

    /*const calculateStock = async () => {
        setStock(await getStockByProduct(props.item.name));
    }*/

    useEffect(() => {
        const calculateStock = async () => {
            setStock(await getStockByProduct(props.item.name));
        }

        calculateStock();
    }, [props.item.name]);

    return (

    <div>
        <Card key={props.item.name}>
            <CardHeader title={props.item.name} />
                <Link to={"/products/name/" + props.item.name} className="nav-link" key={props.item.name}>
                <CardMedia component="img" width="200" height="200" src={props.item.urlPhoto} alt={props.item.name} />
            </Link>
            <CardContent>
                $ {props.item.price}
            </CardContent>
            
            <CardActions disableSpacing>
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
                <IconButton aria-label={"add to cart" + props.item.name} disableFocusRipple size="small" onClick={() => handleAddToCart(props.item, props.setAmount, itemAmount, stock)}>
                    {
                        (!localStorage.getItem("currentUser")?.includes("admin")) &&
                        <AddShoppingCartIcon />
                    }
                    Add to cart
                </IconButton>
                <p>Stock: {stock}</p>
            </CardActions>
        </Card>
    </div>

    );
};

export default Item;