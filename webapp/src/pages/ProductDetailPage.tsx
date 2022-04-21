import { Product } from '../shared/shareddtypes'
import { useState, useEffect } from 'react';
import { getProductsByName } from '../api/api';
import ItemDetails from '../components/ItemDetails';
import DisplayRelatedProducts from '../components/DisplayRelatedProducts';

interface ProductDetailProps {
    setUser: (user: string) => void
    setAmount: (amount: string) => void
}

const ProductDetailPage = (props: ProductDetailProps) => {
    const productName = ((window.location.href.split("/"))[5]).replaceAll("\%20", " ");

    const [product, setProduct] = useState<Product[]>([]);

    const loadProduct = async () => {
        setProduct(await getProductsByName(productName));
    }

    useEffect(() => {
        loadProduct();
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