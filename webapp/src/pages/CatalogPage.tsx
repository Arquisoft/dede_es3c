import React, { Fragment, FC, useEffect, useState, Component } from "react";
import "bootswatch/dist/superhero/bootstrap.min.css"
import Button from '@mui/material/Button';
import { Dropdown, DropdownButton, Form, FormControl } from "react-bootstrap";
import LoadedProducts from "../components/ProductDisplay";
import Header from "../components/Header";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Product } from '../shared/shareddtypes';
import { getProducts, getProductsByCategory, getProductsByName } from "../api/api";
import { Collapse, Grid, styled } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FeedIcon from '@mui/icons-material/Feed';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { DisplayProducts } from "../components/DisplayProducts";

interface CatalogPageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

/*interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));*/

let productsToDisplay: any = null;
//let loaded: Boolean = false;

function LoadProducts(){
    console.log("aux")
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        LoadProductsAux();
    }, []);

    const LoadProductsAux = async () => {
        const productsAux: Product[] = await getProducts();
        setProducts(productsAux);
    };

    productsToDisplay = <DisplayProducts products={products} />

    console.log(productsToDisplay)

    //productsToDisplay = <DisplayProducts setUser={props.setUser} translate={props.translate} products={products} />

    //productsToDisplay = DisplayProducts(products);
}

function FilterProducts(name: string){
    productsToDisplay = null;

    const [products, setProducts] = useState<Product[]>([]);

    async function LoadProductsAux() {
        const productsAux: Product[] = await getProductsByName(name);
        setProducts(productsAux);
    };

    LoadProductsAux();

    productsToDisplay = products;

    //productsToDisplay = DisplayProducts(products);
}

/*function FilterProductsByCategory(category: string) {
    productsToDisplay = null;

    const [products, setProducts] = useState<Product[]>([]);

    async function LoadProductsAux() {
        const productsAux: Product[] = await getProductsByCategory(category);
        setProducts(productsAux);
    };

    LoadProductsAux();

    productsToDisplay = DisplayProducts(products);
}*/

/*function DisplayProducts(products: Product[]) {
    const [expanded, setExpanded] = React.useState(false);
    const [expandedId, setExpandedId] = React.useState(-1);

    const handleExpandClick = (i: React.SetStateAction<number>) => {
        setExpandedId(expandedId === i ? -1 : i);
    };

    const DisplayData = products.map(
        (info, i) => {
            return (
                <Grid item xs={12} sm={4} md={2}>
                    <Card key={info.name}>
                        <CardHeader title={info.name} />
                        <CardMedia component="img" width="200" height="200" src={info.urlPhoto} alt={info.name} />
                        <CardContent>
                            Price: {info.price}
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to cart" disableFocusRipple size="small">
                                <AddShoppingCartIcon />
                            </IconButton>
                            <ExpandMore expand={expanded} onClick={() => handleExpandClick(i)} aria-expanded={expanded} aria-label="show more" size="small">
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>
                                    {info.description}
                                </Typography>
                            </CardContent>
                        </Collapse>
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

}*/

const CatalogPage: FC<CatalogPageProps> = (props: CatalogPageProps) => {

    //LoadProducts();

    return (
        <div>
            <Header setUser={props.setUser} />
            <h1>CATÁLOGO</h1>

            <Form>
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <Button type="submit" onClick={() => FilterProducts("HP Monitor")} >Search</Button>
            </Form>

            <DropdownButton title="Selecciona una categoría">
                <Dropdown.Menu>
                    <Dropdown.Item href="#">Monitores</Dropdown.Item>
                    <Dropdown.Item href="#">Laptops</Dropdown.Item>
                </Dropdown.Menu>

            </DropdownButton>

            {/*<DisplayProducts products={productsToDisplay} />*/}
            {/*{productsToDisplay}*/}
            {productsToDisplay}
        </div>
    );
    
}
export default CatalogPage;