import { Product } from '../shared/shareddtypes';
import { Grid } from "@mui/material";
import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../api/api';
import ItemDetails from '../components/ItemDetails';
import RelatedProduct from '../components/RelatedProduct';

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

    //<ItemDetails item={item} setAmount={props.setAmount}/>

    return (
        <div>
            <Grid container spacing={3}>
                {relatedProducts?.map((item: Product) => {
                    return (
                        <Grid item key={item.name} xs={12} sm={3}>
                            <RelatedProduct item={item} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default DisplayRelatedProducts;