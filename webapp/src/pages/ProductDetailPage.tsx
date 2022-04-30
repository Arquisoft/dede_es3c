import { Product } from '../shared/shareddtypes'
import { useState, useEffect } from 'react';
import { getProductsByName } from '../api/api';
import ItemDetails from '../components/ItemDetails';
import DisplayRelatedProducts from '../components/DisplayRelatedProducts';
import useProductDetail from '../hooks/useProductDetail';

interface ProductDetailProps {
    setUser: (user: string) => void
    setAmount: (amount: string) => void
    item: Product;
}

const ProductDetailPage = (props: ProductDetailProps) => {
    //const productName = ((window.location.href.split("/"))[5]).replaceAll("%20", " ");

    //const [product, setProduct] = useState<Product[]>([]);

    /*const loadProduct = async () => {
        setProduct(await getProductsByName(productName));
    }

    useEffect(() => {
        loadProduct();
    });*/

    //const { product } = useProductDetail(productName);

    /*<div>
            <ItemDetails item={product!} setAmount={props.setAmount} key={productName}/>
            <h2>Productos relacionados:</h2>
            <DisplayRelatedProducts item={product!} setAmount={props.setAmount} />
    </div>*/
    
    return(
        
        <div>
            <ItemDetails item={props.item} setAmount={props.setAmount} key={props.item.name} />
            <h2>Productos relacionados:</h2>
            <DisplayRelatedProducts item={props.item} setAmount={props.setAmount} />
        </div>

    );
};

export default ProductDetailPage;