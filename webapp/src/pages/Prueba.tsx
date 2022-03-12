import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Product } from '../shared/shareddtypes';

function Home(){
    const url = "http://localhost:5000/api/products"
    const [products, setProducts] = useState({
        loading: false,
        data: null,
        error: false
    })

    useEffect(() => {
        setProducts({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url)
            .then(response => {
                setProducts({
                    loading: false,
                    data: response.data,
                    error: false
                })
            })
            .catch(() => {
                setProducts({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url])

    let content = null;

    if(products.error){
        content = <p>
            There was an error please refresh or try again later.
        </p>
    }

    {/*if(products.data){
        content =
            products.data.map((product: Product) => 
                <div key={product.name}>
                    {product.name}
                </div>
            )
    }*/}

    return(
        <div>
            <h1>Best sellers</h1>
            {content}
        </div>
    )
}
export default Home