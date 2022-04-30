import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getProductByName } from "../api/api";
import { Product } from "../shared/shareddtypes";

const useProductDetail = ( productName: string ) => {

    const [product, setProduct]  = useState<Product>();

    console.log(productName)

    useEffect(() => {

        const loadProduct = async () => {
            try{
                setProduct(await getProductByName("NiSuPu Monitor"));
            }
            catch (error){
                console.log("error")
            }
        }

        setProduct({name: "a", description: "a", price: 0, category: "a", urlPhoto: "a", amount: 0})

        loadProduct();

    }, [productName]);

    console.log(product);

    return { product };

}

export default useProductDetail;