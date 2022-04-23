import React, { useState } from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const Item = (props: Props) => {
    const [itemAmount, setItemAmount] = useState<string>('1');

    const handleChange = (event: SelectChangeEvent) => {
        setItemAmount(event.target.value as string);
    };

    return (

    <div>
        <Card key={props.item.name}>
            <CardHeader title={props.item.name} />
            <Link to={"/products/name/" + props.item.name} className="nav-link">
                <CardMedia component="img" width="200" height="200" src={props.item.urlPhoto} alt={props.item.name} />
            </Link>
            <CardContent>
                $ {props.item.price}
            </CardContent>
            
            <CardActions disableSpacing>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={itemAmount}
                            label="Amount"
                            onChange={handleChange}
                            size="small"
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <IconButton aria-label="add to cart" disableFocusRipple size="small" onClick={() => handleAddToCart(props.item, props.setAmount, itemAmount)}>
                    {
                        (!localStorage.getItem("currentUser")?.includes("admin")) &&
                        <AddShoppingCartIcon />
                    }
                </IconButton>
                <p>Stock: 5</p>
            </CardActions>
        </Card>
    </div>

    );
};

export default Item;