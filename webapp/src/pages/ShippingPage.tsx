import React, {Fragment, FC, useState} from "react";
import Header from "../components/Header"
import { Card, CardContent, Container, ImageListItem, List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField} from "@mui/material";
import { Button } from "react-bootstrap";
import { Product } from "../shared/shareddtypes";

interface ShippingPageProps {
    translate: (key: string) => string
    setUser:(user:string) => void
}

const ShippingPage: FC<ShippingPageProps> = (props: ShippingPageProps) => {
  const products = localStorage.getItem("cart");
  var size:number = 0;
  var cartProducts: Product[] = [];
  var finalPrice: number = 0;
  if (products !== null){
    size  = JSON.parse(products).length;
    //console.log(JSON.parse(products));
    for (let index = 0; index < size; index++) {
      cartProducts[index] = 
      {
        name: JSON.parse(products)[index]['name'],
        description: JSON.parse(products)[index]['description'],
        price: JSON.parse(products)[index]['price'],
        category: JSON.parse(products)[index]['category'],
        urlPhoto: JSON.parse(products)[index]['urlPhoto'],
        amount: JSON.parse(products)[index]['amount']
      }
      finalPrice+= cartProducts[index].price;
    }
    console.log(finalPrice);
    console.log(cartProducts);
  }
  return(
    <div>
      <Header setUser={props.setUser}/>
      <h1>{props.translate("shipping.title")}</h1> 
      <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                <h3>{props.translate('shipping.selectedProducts')}</h3>
                    <Fragment>
                    <List
                    style={{ display: "grid", margin: "auto", textAlign: "center" }}
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 300,
                      '& ul': { padding: 0 },
                    }}
                    >
                      <li key={'Productos'}>
                        <ul>
                          <ListSubheader>{'Seleccionados'}</ListSubheader>
                          {cartProducts.map((item) => (
                          <ListItem key={item.name}>
                            <img alt="desc" src= {item.urlPhoto} width= '70' height='70'/>
                            <ListItemText primary={"\t"+item.name + "\:" + item.price + "$"} />
                            </ListItem>
                            ))}
                        </ul>
                        <ul>
                        <ListItem>
                        <ListItemText primary={"Total: "+finalPrice} />
                        </ListItem>
                        </ul>
                      </li>
                    </List>
                    </Fragment>
                    <Fragment>
                      <h2>{props.translate("shipping.address")}</h2>
                      <TextField>
                      </TextField>
                      <Button>
                        check
                      </Button>
                    </Fragment>
            </CardContent>
            </Card>
            <Button variant="contained" type="submit">{props.translate('shipping.proceed')}</Button>
        </Container>
    </div>     
    );

}

export default ShippingPage;