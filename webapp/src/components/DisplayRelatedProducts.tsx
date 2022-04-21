import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardContent from '@mui/material/CardContent';
import { Product } from '../shared/shareddtypes';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Drawer, Grid, Badge } from "@mui/material";
import Item from '../components/Item';
import { useState, useEffect, useContext } from 'react';
import { getProductsByName, getProductsByCategory } from '../api/api';
import ItemDetails from '../components/ItemDetails';

type Props = {
    item: Product[];
    setAmount: (amount: string) => void
};

const DisplayRelatedProducts = (props: Props) => {
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const loadRelatedProducts = async () => {
        setRelatedProducts(await getProductsByCategory(props.item[0].category));
    }

    useEffect(() => {
        loadRelatedProducts();
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                {relatedProducts?.map((item: Product) => {
                    return (
                        <Grid item key={item.name} xs={12} sm={4}>
                            <ItemDetails item={item} setAmount={props.setAmount}/>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default DisplayRelatedProducts;