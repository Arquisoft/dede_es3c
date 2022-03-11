import React, { Fragment, FC, useEffect, useState, Component } from "react";
import "bootswatch/dist/superhero/bootstrap.min.css"
import Button from '@mui/material/Button';
import { Form, FormControl } from "react-bootstrap";
import JsonDataDisplay from "../components/ProductDisplay";
import Header from "../components/Header";

const checkParams = (text: string) => {
    return text == "" || text == null;
}

interface CatalogPageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

function Load() {
    return (
        <div id="datos">
            <h1>Products</h1>
            <JsonDataDisplay />
        </div>
    );
}

const CatalogPage: FC<CatalogPageProps> = (props: CatalogPageProps) => {

    return (
        <div>
            <Header setUser={props.setUser} />
            <h1>CATÁLOGO</h1>

            <Form>
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                <Button type="submit">Search</Button>
            </Form>

            {Load()}
        </div>
    );
}
export default CatalogPage;