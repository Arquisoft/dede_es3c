import React, {Fragment, FC, useState, useContext} from "react";
import {Box, Card, CardContent, Container, List, ListItem, ListItemText, ListSubheader, Modal, TextField, Typography} from "@mui/material";
import { Button} from "react-bootstrap";
import {Product, OrderProduct } from "../shared/shareddtypes";
import { addOrder, getAddress, getUser } from "../api/api";
import Swal from 'sweetalert2';
import { Navigate, Link } from "react-router-dom";
import { LangContext } from '../lang';
import DisplayDistributionCenters from "../components/DistributionCenterDisplay";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


interface ShippingPageProps {
    setUser:(user:string) => void
}

const ShippingPage: FC<ShippingPageProps> = (props: ShippingPageProps) => {
  const { dispatch: { translate } } = useContext(LangContext);
  const [webID, setWebID] = useState("");
  const [countryName, setCountryName] = useState("");
  const [locality, setLocality] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [card, setCard] = useState("");
  const [productsOder, setProductsOrder] = useState<OrderProduct[]>([]);
  const [openPrice, setOpenPrice] = useState(false);

  const handleOpenPrice = () => {
    setOpenPrice(true);
  };
  const handleClosePrice = () => {
    setOpenPrice(false);
  };
 
  const addressFields = () => {
    if (countryName === '' || locality === '' || postalCode === '' || region === '' || streetAddress === ''){
      return true;
    }
    return false
  }

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

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const showConfirmation = () => {
    Swal.fire({
      title: "Success",
      text: translate("shipping.confirmation"),
      icon: "success",
    }).then(() => window.location.assign("/catalog"));
  }
  const generateOrderProduct = () => {
    var productOrders:  OrderProduct[] = [];
    for (let index = 0; index < cartProducts.length; index++) {
      var center = localStorage.getItem("Center " + cartProducts[index].name);
      var centerName = "";
      if (center !== null){
        centerName = center;
      }
      var oP: OrderProduct  = 
      {
        product: cartProducts[index],
        quantity: cartProducts[index].amount,
        shippingPrice: 1,
        distributionCenter: {address: centerName}
      }
      productOrders[index] = oP;    
    }
    console.log(productOrders);
    generateOrder(productOrders);
    handleClosePrice();
    showConfirmation();
    return productOrders;
  }

  const parseAddress = () => {
    var street = streetAddress.split(" ");

    return street[0] + street[1] + "," + street[2] + "," + locality;
  }


  const generateOrder = async (prods: OrderProduct[]) => {
    var email = "";
    var user = localStorage.getItem("currentUser");
    var parsedAddress:string = parseAddress();
    console.log(parsedAddress)
    if (user !== null){
      email = (await getUser(user)).email
    }
    if (prods.length > 0){
       await addOrder(email, prods)
    } else{
      console.log(productsOder)
    }
  }

  async function getAdd() {
    await getAddress(webID).then(address => {
      console.log(address)
      if (address !== null){
        setCountryName(address['country']);
        setLocality(address['locality']);
        setPostalCode(address['postalCode']);
        setRegion(address['region']);
        setStreetAddress(address['street']);
        Toast.fire({
          icon: 'success',
          title: '¡We got your addres! check it out'
        })
      } else {
        Toast.fire({
          icon: 'error',
          title: 'We could not get your address'});
      }
  }, () => {
    Toast.fire({
      icon: 'error',
      title: 'We could not get your address'});
    });
  }
  

  if (localStorage.getItem("currentUser") === "not logged"){
    return <Navigate to={"/login"}/>
  } else if (cartProducts.length === 0){
    return (
      <div>
        <h1>{translate("shipping.title")}</h1>
        <h2>{translate("shipping.nothing")}</h2>
        <Link to="/catalog">{translate("orders.shopping")}</Link>
      </div>    
    );
  }
  return(
    <div>
      <h1 aria-label="selectedProductsTitle">{translate("shipping.title")}</h1> 
      <Container component="main"maxWidth="lg">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                <h3 aria-label="selectedProductsSubtitle">{translate('shipping.selectedProducts')}</h3>
                    <Fragment>
                    <List
                    style={{ display: "grid", margin: "auto", textAlign: "center" }}
                    sx={{
                      width: '100%',
                      maxWidth: 700,
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 700,
                      '& ul': { padding: 0 },
                    }}
                    >
                      <li key={'Productos'}>
                        <ul>
                          <ListSubheader>{translate('shipping.selectedProducts')}</ListSubheader>
                          {cartProducts.map((item) => (
                            <ListItem key={item.name} alignItems="center">
                            <img alt="desc" src= {item.urlPhoto} width= '70' height='70'/>
                            <ListItemText primary={"x" + item.amount + "\t"+item.name + ":" + item.price + "$"} />
                            <DisplayDistributionCenters product={item}/>
                            </ListItem>
                            ))}
                        </ul>
                        <ul>
                        <ListItem>
                        <ListItemText primary={translate("shipping.withoutA") + finalPrice.toFixed(2) + "$"}/>
                        </ListItem>
                        </ul>
                      </li>
                    </List>
                    </Fragment>
                    <Fragment>
                      <h2>{translate("shipping.address")}</h2>
                      <TextField
                        required
                        size="small"
                        name="username"
                        label= {translate ('login.solidUser')} 
                        variant="outlined"
                        value={webID}
                        helperText= {translate('login.input')}
                        onChange={e => setWebID(e.target.value)}
                        sx={{ my: 2 }} >
                      </TextField>
                      <Button onClick={() => getAdd()}>
                        {translate("login.validate")}
                      </Button>
                      <div>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="country"
                        label= {translate ('shipping.country')} 
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
                        label= {translate ('shipping.locality')} 
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
                        label= {translate ('shipping.postal')} 
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
                        label= {translate ('shipping.region')} 
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
                        label= {translate ('shipping.street')} 
                        variant="outlined"
                        value={streetAddress}
                        sx={{ my: 2 }} 
                        >
                      </TextField>
                      <Button 
                      variant="contained" 
                      type="submit"
                      disabled={addressFields()}
                      onClick={() => handleOpenPrice()}
                      >
                        {translate('shipping.proceed')}
                      </Button>
                      <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                    open = {openPrice}
                    onClose ={handleClosePrice}
                    >
                    <Box sx={style}>
                    <Typography id = "modal-modal-title" variant = "h6" component= "h2">{translate("shipping.resume")}</Typography>
                    <div>
                    <Typography id = "modal-modal-subtitle2" variant = "subtitle2" component= "text">{translate("shipping.priceFinal") + ": " + finalPrice.toFixed(2) + "$"}</Typography>
                    </div>
                    <div>
                    <Typography id = "modal-modal-subtitle2" variant = "subtitle2" component= "text">{translate("shipping.creditCard")}</Typography>
                    </div>
                    <TextField
                     required
                     size="medium"
                     name="username"
                     label= {translate ('shipping.card')} 
                     variant="outlined"
                     value={card}
                     helperText= {translate('shipping.card')}
                     onChange={e => setCard(e.target.value)}
                     sx={{ my: 2 }} >       
                    </TextField> 
                    <Button 
                    disabled= {card === '' || card.length < 8}
                    onClick={() => generateOrderProduct()}>
                    {translate("shipping.end")}</Button>      
                    <Fragment >
                    </Fragment>
                    </Box>
                    </Modal>
                    </Fragment>
            </CardContent>
            </Card>
        </Container>
    </div>     
    );

}

export default ShippingPage;