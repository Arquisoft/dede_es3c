import { Product } from '../shared/shareddtypes';
import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import { getRelatedProducts } from '../api/api';
import RelatedProduct from '../components/RelatedProduct';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const DisplayRelatedProducts = (props: Props) => {
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const loadRelatedProducts = async () => {
        try {
            setRelatedProducts(await getRelatedProducts(props.item.name, props.item.category));
        } catch (error) {
            console.log("Error al cargar los productos relacionados");
        }
    }

    useEffect(() => {
        loadRelatedProducts();
    });

    return (
        <div>
            <Grid container spacing={3}>
                {
                    (relatedProducts.length === 0) &&

                    <Typography width="100%" id="modal-modal-title" variant="h5" component="h1" color="red" textAlign="center">
                        <p>No hay productos relacionados</p>
                    </Typography>
                    
                }

                {relatedProducts?.map((item: Product, i) => {
                    return (
                        <Grid item key={i} xs={12} sm={3} >
                            <RelatedProduct item={item} setAmount={props.setAmount} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default DisplayRelatedProducts;