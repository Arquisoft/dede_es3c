import React, { Fragment, FC, useEffect, useState } from "react";
import "bootswatch/dist/superhero/bootstrap.min.css"
import Button from '@mui/material/Button';
import { Form, FormControl } from "react-bootstrap";
import { getProduct, getProducts } from "../api/api";
import { CoPresentSharp } from "@mui/icons-material";

const checkParams = (text: string) => {
    return text == "" || text == null;
}

interface CatalogPageProps {
    translate: (key: string) => string
    //session: (user: User) => void;
}
const CatalogPage: FC<CatalogPageProps> = ({ translate }) => {

    const loadProducts = async () => {
        const productList = await getProducts();
        
        const listAux = [];

        for (let product of productList) {
            listAux.push(product);
        }
    };

    return (
        <div>
            <h1>CATÁLOGO</h1>

            <Form>
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                <Button type="submit">Search</Button>
            </Form>


            
        </div>
    );
}
export default CatalogPage;