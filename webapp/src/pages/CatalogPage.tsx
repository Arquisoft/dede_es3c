import React, { Fragment, FC, useEffect, useState, Component } from "react";
import "bootswatch/dist/superhero/bootstrap.min.css"
import Button from '@mui/material/Button';
import { Form, FormControl } from "react-bootstrap";
import JsonDataDisplay from "../components/ProductDisplay";

const checkParams = (text: string) => {
    return text == "" || text == null;
}

interface CatalogPageProps {
    translate: (key: string) => string
    //session: (user: User) => void;
}

function Load() {
    return (
        <div id="datos">
            <h1>Products</h1>
            <JsonDataDisplay />
        </div>
    );
}

const CatalogPage: FC<CatalogPageProps> = ({ translate }) => {

    return (
        <Fragment>
            <h1>CATÁLOGO</h1>

            <Form>
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                <Button type="submit">Search</Button>
            </Form>

            {Load()}
            
        </Fragment>
    );
}
export default CatalogPage;