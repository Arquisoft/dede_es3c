import React, { Fragment, FC, useEffect, useState, Component } from "react";
import "bootswatch/dist/superhero/bootstrap.min.css"
import Button from '@mui/material/Button';
import { Dropdown, DropdownButton, Form, FormControl } from "react-bootstrap";
import LoadedProducts from "../components/ProductDisplay";
import Header from "../components/Header";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Product } from '../shared/shareddtypes';
import { getProducts, getProductsByName } from "../api/api";
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FeedIcon from '@mui/icons-material/Feed';
import CardContent from '@mui/material/CardContent';

const checkParams = (text: string) => {
    return text == "" || text == null;
}

interface CatalogPageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

let productsToDisplay:any = null;

function LoadProducts(){
    productsToDisplay = null;

    const [products, setProducts] = useState<Product[]>([]);

    async function LoadProductsAux() {
        const productsAux: Product[] = await getProducts();
        setProducts(productsAux);
    };

    LoadProductsAux();

    productsToDisplay = DisplayProducts(products);
}

function FilterProducts(name: string){
    productsToDisplay = null;

    const [products, setProducts] = useState<Product[]>([]);

    async function LoadProductsAux() {
        const productsAux: Product[] = await getProductsByName(name);
        setProducts(productsAux);
    };

    LoadProductsAux();

    productsToDisplay = DisplayProducts(products);
}

function DisplayProducts(products: Product[]) {
    const DisplayData = products.map(
        (info) => {
            return (
                <Grid item xs={12} sm={4} md={2}>
                    <Card>
                        <CardHeader title={info.name} />
                        <CardMedia component="img" width="200" height="200" src={info.urlPhoto} alt={info.name} />
                        <CardContent>
                            Price: {info.price}
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="see details" disableFocusRipple>
                                <FeedIcon />
                            </IconButton>
                            <IconButton aria-label="add to cart" disableFocusRipple>
                                <AddShoppingCartIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            );
        }
    )

    return (
        <Grid container spacing={2}>
            {DisplayData}
        </Grid>
    );
}

const CatalogPage: FC<CatalogPageProps> = (props: CatalogPageProps) => {

    LoadProducts();

    return (
        <div>
            <Header setUser={props.setUser} />
            <h1>CATÁLOGO</h1>

            <Form>
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                <Button type="submit" onClick={() => FilterProducts("Monitor HP")} >Search</Button>
            </Form>

            <DropdownButton title="Selecciona una categoría">
                <Dropdown.Menu>
                    <Dropdown.Item href="#">Monitores</Dropdown.Item>
                </Dropdown.Menu>
                
            </DropdownButton>

            {productsToDisplay}
        </div>
    );
}
export default CatalogPage;


