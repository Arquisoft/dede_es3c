import React, {Fragment, FC, useState, useContext} from "react";
import { Card, CardContent, Container, List, ListItem, ListItemText, ListSubheader, TextField} from "@mui/material";
import { Button } from "react-bootstrap";
import { Product } from "../shared/shareddtypes";
import { getAddress } from "../api/api";
import Swal from 'sweetalert2';
import { Navigate, Link } from "react-router-dom";
import { LangContext } from '../lang';
import DisplayDistributionCenters from "../components/DistributionCenterDisplay";
import Authenticator from "../components/LoginSolid";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 420,
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
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [CVV, setCVV] = useState("");
  const [productsOder, setProductsOrder] = useState<OrderProduct[]>([]);
  const [openPrice, setOpenPrice] = useState(false);
  const [openPod, setOpenPod] = useState(false);

  const handleOpenPrice = () => {
    setOpenPrice(true);
  };
  const handleClosePrice = () => {
    setOpenPrice(false);
  };

  const handleOpenPod = () => {
    setOpenPod(true);
  };
  const handleClosePod = () => {
    setOpenPod(false);
  };
 
  const addressFields = () => {
    if (countryName === '' || locality === '' || postalCode === '' || region === '' || streetAddress === ''){
      return true;
    }
    return false

  const cleanFields = () => {
    setCountryName("");
    setLocality("");
    setPostalCode("");
    setRegion("");
    setStreetAddress("");
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

  const removeAccents = (str:string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  const parseAddress = () => {
    var street = streetAddress.split(" ");
    return removeAccents(street[0] + street[1] + "," + street[2] + "," + locality);
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
       await addOrder(email, prods, parsedAddress)
    } else{
      console.log(productsOder)
    }
  }


  async function getAdd() {
    try{
      const address = await getAddress(webID);
      if (address !== undefined) {

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
        Swal.fire({
          title: "Error",
          text: translate("solid.error"),
          icon: "error",
        });

      }
    } catch (error){
      console.log("Error al recuperar la dirección");
    }
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
      <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                <h3 aria-label="selectedProductsSubtitle">{translate('shipping.selectedProducts')}</h3>
                    <Fragment>
                    <List
                    style={{ display: "grid", margin: "auto", textAlign: "center" }}
                    sx={{
                      width: '100%',
                      maxWidth: 500,
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 1000,
                      '& ul': { padding: 0 },
                    }}
                    >
                      <li key={'Productos'}>
                        <ul>
                          {cartProducts.map((item) => (
                            <ListItem key={item.name}>
                            <img alt="desc" src= {item.urlPhoto} width= '70' height='70'/>
                            <ListItemText primary={"x" + item.amount + "\t"+item.name + ":" + item.price + "$"} />
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
                      <Button onClick={() => handleOpenPod()}>
                        If your address is private, click here to Log in your solid POD
                      </Button>
                      <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                    open = {openPod}
                    onClose ={handleClosePod}
                    >
                    <Box sx={style}>
                    <Authenticator/>
                    </Box>
                    </Modal>
                      <Fragment>
                      </Fragment>
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
                      <Button onClick={() => { cleanFields(); getAdd()}}
                style={{
                  borderRadius: 15,
                  backgroundColor: "#e8e8e8",
                  padding: "18px 36px",
                  fontSize: "18px"
                }}>

                        {translate("login.validate")}
                      </Button>
                      <div>
                      <TextField
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
                      onClick={() => {cleanFields(); handleOpenPrice()}}
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
                    <Typography id = "modal-modal-subtitle2" variant = "subtitle2" component= "text">{translate("shipping.price") + " " + 10.0 + "$"}</Typography>
                    </div>
                    <div>
                    <Typography id = "modal-modal-subtitle2" variant = "subtitle2" component= "text">{translate("shipping.priceFinal") + " " + (finalPrice + 10.0).toFixed(2) + "$"}</Typography>
                    </div>
                    <div>
                    <Typography id = "modal-modal-subtitle2" variant = "subtitle2" component= "text">{translate("shipping.creditCard")}</Typography>
                    </div>
                    <Fragment>
            <TextField
             required
             size="small"
             name="country"
             label= {translate ('card.number')} 
             variant="outlined"
             value={cardNumber}
             onChange={e => setCardNumber(e.target.value)}
             sx={{ my: 2 }}>
            </TextField>

            <TextField
             required
             size="small"
             name="country"
             label= {translate ('card.expire')} 
             variant="outlined"
             value={expireDate}
             onChange={e => setExpireDate(e.target.value)}
             sx={{ my: 2 }}>
            </TextField>

            <TextField
             required
             size="small"
             name="country"
             label= {translate ('card.cvv')} 
             variant="outlined"
             value={CVV}
             onChange={e => setCVV(e.target.value)}
             sx={{ my: 2 }}>
            </TextField>

        </Fragment>
                    <Button 
                    disabled= {(CVV === '' || CVV.length !== 3) || (cardNumber ==='' || cardNumber.length < 12) || (expireDate === '')}
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