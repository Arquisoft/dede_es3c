import React, { Fragment, FC, useEffect, useState, Component } from "react";
import "bootswatch/dist/superhero/bootstrap.min.css"
import Button from '@mui/material/Button';
import { Dropdown, DropdownButton, Form, FormControl } from "react-bootstrap";
import LoadedProducts from "../components/ProductDisplay";
import Header from "../components/Header";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Product } from '../shared/shareddtypes';
import { getProducts } from "../api/api";

const checkParams = (text: string) => {
    return text == "" || text == null;
}

interface CatalogPageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

function DisplayProducts() {
    return (
        <div id="productos">
            <LoadedProducts  />
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

            <DropdownButton title="Selecciona una categoría">
                <Dropdown.Menu>
                    <Dropdown.Item href="#">Monitores</Dropdown.Item>
                </Dropdown.Menu>
                
            </DropdownButton>

            {DisplayProducts()}
        </div>
    );
}
export default CatalogPage;