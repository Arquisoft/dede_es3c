import React, {Fragment, FC, useState} from "react";
import Header from "../components/Header"
import { Card, CardContent, Container, List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField} from "@mui/material";
import { Button } from "react-bootstrap";
import { Product } from "../shared/shareddtypes";
import { getAddress } from "../api/api";
import Swal from 'sweetalert2';

interface ShippingPageProps {
    translate: (key: string) => string
    setUser:(user:string) => void
}

const ShippingPage: FC<ShippingPageProps> = (props: ShippingPageProps) => {
  const [webID, setWebID] = useState("");
  const [countryName, setCountryName] = useState("");
  const [locality, setLocality] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const products = localStorage.getItem("cart");
  var size:number = 0;
  var cartProducts: Product[] = [];
  var finalPrice: number = 0;
  if (products !== null){
    size  = JSON.parse(products).length;
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
  }

  async function getAdd() {
    const address = await getAddress(webID);
    console.log(address);
    if (address['result'] !== undefined){
      console.log(address);
      setCountryName(address['result']['country_name']);
      setLocality(address['result']['locality']);
      setPostalCode(address['result']['postal_code']);
      setRegion(address['result']['region']);
      setStreetAddress(address['result']['street_address']);
    } else {
      Swal.fire({
        title: "Error",
        text: props.translate("solid.error"),
        icon: "error",
    });

    }
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
                      maxWidth: 500,
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 500,
                      '& ul': { padding: 0 },
                    }}
                    >
                      <li key={'Productos'}>
                        <ul>
                          <ListSubheader>{props.translate('shipping.selectedProducts')}</ListSubheader>
                          {cartProducts.map((item) => (
                          <ListItem key={item.name}>
                            <img alt="desc" src= {item.urlPhoto} width= '70' height='70'/>
                            <ListItemText primary={"x" + item.amount + "\t"+item.name + "\:" + item.price + "$"} />
                            </ListItem>
                            ))}
                        </ul>
                        <ul>
                        <ListItem>
                        <ListItemText primary={props.translate("shipping.withoutA") +finalPrice} />
                        </ListItem>
                        </ul>
                      </li>
                    </List>
                    </Fragment>
                    <Fragment>
                      <h2>{props.translate("shipping.address")}</h2>
                      <TextField
                        required
                        size="small"
                        name="username"
                        label= {props.translate ('login.solidUser')} 
                        variant="outlined"
                        value={webID}
                        helperText= {props.translate('login.input')}
                        onChange={e => setWebID(e.target.value)}
                        sx={{ my: 2 }} >
                      </TextField>
                      <Button onClick={() => getAdd()}>
                        {props.translate("login.validate")}
                      </Button>
                      <div>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="country"
                        label= {props.translate ('shipping.country')} 
                        variant="outlined"
                        value={countryName}
                        sx={{ my: 2 }} 
                        >
                      </TextField>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="locality"
                        label= {props.translate ('shipping.locality')} 
                        variant="outlined"
                        value={locality}
                        sx={{ my: 2 }} 
                        >
                      </TextField>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="postalCode"
                        label= {props.translate ('shipping.postal')} 
                        variant="outlined"
                        value={postalCode}
                        sx={{ my: 2 }} 
                        >
                      </TextField>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="region"
                        label= {props.translate ('shipping.region')} 
                        variant="outlined"
                        value={region}
                        sx={{ my: 2 }} 
                        >
                      </TextField>        
                      </div>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="street"
                        label= {props.translate ('shipping.street')} 
                        variant="outlined"
                        value={streetAddress}
                        sx={{ my: 2 }} 
                        >
                      </TextField>
                      <Button variant="contained" type="submit">{props.translate('shipping.proceed')}</Button>
                    </Fragment>
            </CardContent>
            </Card>
        </Container>
    </div>     
    );

}

export default ShippingPage;