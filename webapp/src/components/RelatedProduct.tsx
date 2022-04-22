import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Product } from '../shared/shareddtypes';
import Button from '@mui/material/Button';

type Props = {
    item: Product;
};

const Item: React.FC<Props> = ({ item }) => (
    <div>
        <Card key={item.name}>
            <CardHeader title={item.name} />
            
            <Button onClick={() => window.location.assign("/products/name/" + item.name) }>
                <CardMedia component="img" width="200" height="200" src={item.urlPhoto} alt={item.name} />
            </Button>
            
            <CardContent>
                $ {item.price}
            </CardContent>
        </Card>
    </div>
);

export default Item;