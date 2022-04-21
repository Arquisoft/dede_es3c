import { Product } from '../shared/shareddtypes'
import { useState, useEffect, useContext } from 'react';
import { getProductsByName, getProductsByCategory } from '../api/api';
import ItemDetails from '../components/ItemDetails';
import { Drawer, Grid, Badge } from "@mui/material";
import Item from '../components/Item';
import DisplayRelatedProducts from '../components/DisplayRelatedProducts';

interface ProductDetailProps {
    setUser: (user: string) => void
    setAmount: (amount: string) => void
}

const ProductDetailPage = (props: ProductDetailProps) => {
    //const productName = ((window.location.href.split("/"))[5]).replaceAll("\%20", " ");
    const productName = "";

    const [product, setProduct] = useState<Product[]>([]);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const loadProduct = async () => {
        setProduct(await getProductsByName(productName));
    }

    const loadRelatedProducts = async () => {
        setRelatedProducts(await getProductsByCategory(product[0].category));
    }

    useEffect(() => {
        loadProduct();
        //loadRelatedProducts();
    }, []);
    
    return(
        <div>
            {product?.map((item: Product) => {
                return (
                    <div>
                        <ItemDetails item={item} setAmount={props.setAmount}/>
                        <h2>Productos relacionados:</h2>
                        <DisplayRelatedProducts item={product} setAmount={props.setAmount}/>
                    </div>
                );
            })};
        </div>
    );
};

export default ProductDetailPage;