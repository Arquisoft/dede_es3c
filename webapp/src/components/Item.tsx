import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardContent from '@mui/material/CardContent';
import { Product } from '../shared/shareddtypes';
import handleAddToCart from '../components/HandleAddToCart';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getStockByProduct } from '../api/api';
import '../styles/ItemCatalog.scss';
import Button from '@mui/material/Button';
import ProductDetailModal from '../components/ProductDetailModal';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const Item = (props: Props) => {
    const [itemAmount, setItemAmount] = useState<string>('0');
    const [stock, setStock] = useState<number>(0);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleChange = (event: SelectChangeEvent) => {
        setItemAmount(event.target.value as string);
    };

    useEffect(() => {
        const calculateStock = async () => {
            try {
                setStock(await getStockByProduct(props.item.name));
            } catch (error) {
                console.log("Error al recuperar el stock de un producto");
            }
        }

        calculateStock();
    }, [props.item.name]);

    return (
        <div>
            {
                (open) &&

                <ProductDetailModal item={props.item} setAmount={props.setAmount} setOpen={setOpen} open={open}/>
            }

            <Card key={props.item.name} >
                <Button onClick={handleOpen} className="buttonImageItemCatalog" id={props.item.name}>
                    <CardMedia component="img" image={props.item.urlPhoto} alt={props.item.name} className="imageItemCatalog" />
                </Button>

                <CardHeader title={props.item.name} titleTypographyProps={{ variant: 'h6' }} className="titleItemCatalog" />

                <CardContent className="priceItemCatalog">
                    $ {props.item.price}
                </CardContent>

                <CardActions disableSpacing className='addToCartZone'>
                    <div className='stockItemCatalog'>
                        <p>Stock: {stock}</p>
                    </div>

                    {
                        (!localStorage.getItem("currentUser")?.includes("admin")) &&
                        <div className='addToCartSelectorButton'>
                            <div aria-label='selector'>
                                <Box className="selectorItemCatalog">
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
                            </div>
                            <div>
                                <IconButton aria-label={"add to cart" + props.item.name} disableFocusRipple size="small" onClick={() => handleAddToCart(props.item, props.setAmount, itemAmount, stock)} className="buttonItemCatalog" disableRipple={true} >
                                    <AddShoppingCartIcon />
                                    Add to cart
                                </IconButton>
                            </div>
                        </div>
                    }
                </CardActions>
            </Card>
        </div>
    );
};

export default Item;