import React, {Fragment, FC, useState, useEffect} from "react";
import Header from "../components/Header"
import { Order, Product } from "../shared/shareddtypes";
import { getAddress, getOrders } from "../api/api";
import DisplayOrders from "../components/DisplayOrders"
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Card, CardContent, Container, Paper, Table, TableContainer, TableHead, TextField } from "@mui/material";
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
                    </Fragment>
            </CardContent>
            </Card>
            <Button variant="contained" type="submit">{props.translate('shipping.proceed')}</Button>
        </Container>
    </div>     
    );

}

export default ShippingPage;