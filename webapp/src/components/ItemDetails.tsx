import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Product } from '../shared/shareddtypes';
import handleAddToCart from '../components/HandleAddToCart';
import { List, ListItem, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { getStockByProduct } from '../api/api';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../styles/ItemDetails.scss';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

let auxDescription: string[];

const ItemDetails: React.FC<Props> = ({ item, setAmount }) => {
    const [itemAmount, setItemAmount] = useState<string>('0');
    const [stock, setStock] = useState<number>(0);

    const handleChange = (event: SelectChangeEvent) => {
        setItemAmount(event.target.value as string);
    };

    useEffect(() => {
        const calculateStock = async () => {
            try {
                setStock(await getStockByProduct(item.name));
            } catch (error) {
                console.log("Error al recuperar el stock de un producto");
            }
        }

        calculateStock();

        auxDescription = item.description.split("\n");
        console.log(auxDescription);
    }, [item.name, item.description]);

    return(
    <div className='itemDetailsContainer'>
        <div >
                <img alt={item.name} src={item.urlPhoto} className='itemDetailsImage'/>
        </div>
        <div className='itemDetailsRight'>
                <div className='itemDetailsInfo'>
                    <Typography id="modal-modal-title" variant="h5" component="h1" color="black">
                        {item.name}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h4" component="h1" fontWeight="bold" color="black">
                        $ {item.price}
                    </Typography>

                    <List dense={false}>
                        {
                            auxDescription?.map((linea: string) => {
                                return (
                                    <ListItem>
                                        <Typography id="modal-modal-title" component="p" color="black">
                                            {linea}
                                        </Typography>
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </div>
                <div className='itemDetailsBuyControls'>
                    <div>
                        <p className='itemDetailsStock'>Stock: {stock}</p>
                    </div>
                    {
                        (!localStorage.getItem("currentUser")?.includes("admin")) &&
                        <div className="itemDetailsAddToCart">
                            <Box sx={{ minWidth: 70 }} className="itemDetailsAmountSelector">
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

                            <IconButton className='itemDetailsAddButton' aria-label="add to cart" disableFocusRipple size="small" onClick={() => handleAddToCart(item, setAmount, itemAmount, stock)} disableRipple={true}>
                                <AddShoppingCartIcon />
                                T-Add to cart
                            </IconButton>
                        </div>
                    }
                </div> 
        </div>
    </div>
    );
};

export default ItemDetails;