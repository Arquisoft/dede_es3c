import { Product } from '../shared/shareddtypes';
import { Grid } from "@mui/material";
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
        setRelatedProducts(await getRelatedProducts(props.item.name, props.item.category));
    }

    useEffect(() => {
        loadRelatedProducts();
    });

    return (
        <div>
            <Grid container spacing={3}>
                {
                    (relatedProducts.length === 0) &&
                    <p>No hay productos relacionados</p>
                }

                {relatedProducts?.map((item: Product, i) => {
                    return (
                        <Grid item key={i} xs={12} sm={3}>
                            <RelatedProduct item={item} setAmount={props.setAmount} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default DisplayRelatedProducts;