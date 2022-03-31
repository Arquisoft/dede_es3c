import React, {FC, useState, useEffect} from "react";
import Header from "../components/Header"
import { Order } from "../shared/shareddtypes";
import { getOrders, getOrdersByEmail, getUser } from "../api/api";
import DisplayOrders from "../components/DisplayOrders"
import { Button} from "react-bootstrap";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Paper, Table, TableContainer, TableHead } from "@mui/material";

interface OrdersPageProps {
    translate: (key: string) => string
    setUser:(user:string) => void
}

const OrdersPage: FC<OrdersPageProps> = (props: OrdersPageProps) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const reloadItems = async () => {
      if (localStorage.getItem("currentUser") !== null && !localStorage.getItem("currentUser")?.includes("admin")){
        const username = localStorage.getItem("currentUser");
        if (username!== null){
          const user = await getUser(username);
          console.log(user);
          setOrders(await getOrdersByEmail(user.email));
        }
      } else if (localStorage.getItem("currentUser") !== null && localStorage.getItem("currentUser")?.includes("admin")){
        setOrders(await getOrders());
      }
      console.log(orders);
  }

  useEffect(() => {
    reloadItems();
}, []);

    if (orders.length === 0){
        return (
        <div className="main">
            <Header setUser={props.setUser}/>
            <h1>{props.translate("orders.title")}</h1>
            <div className="mainEmptyContainer" style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <h2>{props.translate("orders.empty")}</h2>
            <Button href="/catalog" >{props.translate("orders.shopping")}</Button>  
            </div>
        </div>
        );
    } else {

    }
    return (
        <div className="mainContainer" style={{alignContent:"center", alignItems:"center", alignSelf:"center"}}>
            <Header setUser={props.setUser}/>
            <h1>{props.translate("orders.title")}</h1>
            <div style={{ alignContent:"center", alignItems:"center" }}>
              <TableContainer component={Paper} sx={{maxHeight: "440",maxWidth: "1000" , alignSelf:"center"}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                  <TableCell align="center" colSpan={1}>
                      {props.translate("orders.preview")}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {props.translate("orders.id")}
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                    {props.translate("orders.products")}
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                    {props.translate("orders.price")}
                    </TableCell>
                    <TableCell align="center" colSpan={5}>
                    {props.translate("orders.iva")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {<DisplayOrders key={"orders"} orders={orders}/>}       
                </TableBody>
              </Table>
            </TableContainer>
            </div>
            <div style={{alignContent:"center"}}>
            <Button href="/catalog">{props.translate("orders.shopping")}</Button>
            </div>
        </div>
        
    );

}

export default OrdersPage;