import React, { useState } from 'react';
import { getProducts } from "../api/api";
import { Product } from '../shared/shareddtypes';
import { makeStyles, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Grid from "@mui/material/Grid";
import FeedIcon from '@mui/icons-material/Feed';
import CardContent from '@mui/material/CardContent';

function JsonDataDisplay() {
    
    const [products, setProducts] = useState<Product[]>([]);

    async function LoadProducts() {
        const productsAux: Product[] = await getProducts();
        setProducts(productsAux);
    };

    LoadProducts();

    const DisplayData = products.map(
        (info) => {
            return (
                <Grid item xs={12} sm={4} md={2}>
                    <Card>
                        <CardHeader title={info.name} />
                        <CardMedia component="img" width="200" height="200" src={info.urlPhoto} alt={info.name}/>
                        <CardContent>
                            Price: {info.price}
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="see details" disableFocusRipple>
                                <FeedIcon />
                            </IconButton>
                            <IconButton aria-label="add to cart" disableFocusRipple>
                                <AddShoppingCartIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            );
        }
    )

    return (
        <div>
                <Grid container spacing={2}>
                    {DisplayData}
                </Grid>
        </div>
    )
}
export default JsonDataDisplay;