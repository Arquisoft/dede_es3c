import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Product } from '../shared/shareddtypes';
import Button from '@mui/material/Button';
import { Box, Modal, Typography } from '@mui/material';
import ItemDetails from './ItemDetails';
import DisplayRelatedProducts from './DisplayRelatedProducts';
import ProductDetailModal from './ProductDetailModal';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const RelatedProduct = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {
                (open) &&

                <ProductDetailModal item={props.item} setAmount={props.setAmount} setOpen={setOpen} open={open}/>
            }

            <Card key={props.item.name}>
                <CardHeader title={props.item.name} />

                <Button onClick={handleOpen}>
                    <CardMedia component="img" width="200" height="200" src={props.item.urlPhoto} alt={props.item.name} />
                </Button>

                <CardContent>
                    $ {props.item.price}
                </CardContent>
            </Card>
        </div>
    );
};

export default RelatedProduct;