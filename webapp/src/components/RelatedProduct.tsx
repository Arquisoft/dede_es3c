import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Product } from '../shared/shareddtypes';
import Button from '@mui/material/Button';
import ProductDetailModal from './ProductDetailModal';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const RelatedProduct = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    return (
        <div>
            {
                (open) &&

                <ProductDetailModal item={props.item} setAmount={props.setAmount} setOpen={setOpen} open={open}/>
            }

            <Card key={props.item.name}>
                <CardHeader title={props.item.name} />

                <Button onClick={handleOpen}>
                    <CardMedia component="img" src={props.item.urlPhoto} alt={props.item.name} className="relatedProductImage"/>
                </Button>

                <CardContent>
                    $ {props.item.price}
                </CardContent>
            </Card>
        </div>
    );
};

export default RelatedProduct;