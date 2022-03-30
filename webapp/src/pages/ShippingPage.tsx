import React, {Fragment, FC} from "react";
import Header from "../components/Header"
import { Card, CardContent, Container, TextField} from "@mui/material";
import { Button } from "react-bootstrap";

interface ShippingPageProps {
    translate: (key: string) => string
    setUser:(user:string) => void
}

const ShippingPage: FC<ShippingPageProps> = (props: ShippingPageProps) => {
  return(
    <div>
      <Header setUser={props.setUser}/>
      <h1>{props.translate("shipping.title")}</h1> 
      <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
            <div>
            </div>
                <h3>{props.translate('shipping.selectedProducts')}</h3>
                    <Fragment>
                      {}
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