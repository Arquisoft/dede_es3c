import {FC, useState, useEffect, useContext} from "react";
import { Order } from "../shared/shareddtypes";
import { getOrders, getOrdersByEmail, getUser } from "../api/api";
import DisplayOrders from "../components/DisplayOrders"
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Paper, Table, TableContainer, TableHead, Button } from "@mui/material";
import { LangContext } from "../lang";
import { Navigate, Link } from "react-router-dom";
import GoToTopButton from '../components/GoToTopButton';
import '../styles/Orders.scss';

interface OrdersPageProps {
    setUser:(user:string) => void
}

const OrdersPage: FC<OrdersPageProps> = (props: OrdersPageProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [orders, setOrders] = useState<Order[]>([]);
    
    const reloadItems = async () => {
      try{
        if (localStorage.getItem("currentUser") !== null && !localStorage.getItem("currentUser")?.includes("admin")) {
          const username = localStorage.getItem("currentUser");
          if (username !== null) {
            const user = await getUser(username);
            console.log(user);
            setOrders(await getOrdersByEmail(user.email));
          }
        } else if (localStorage.getItem("currentUser") !== null && localStorage.getItem("currentUser")?.includes("admin")) {
          setOrders(await getOrders());
        }
      } catch (error) {
        console.log("Error al cargar los pedidos");
      }
  }

  useEffect(() => {
    reloadItems();
}, []);
  if (localStorage.getItem("currentUser")?.includes("admin")) {
    return (<Navigate to="/catalog" />);
  }
  else{
    if (orders.length === 0) {
      return (
        <div className="main">
          <h1 aria-label="myOrdersTitleWithout">{translate("orders.title")}</h1>
          <div className="mainEmptyContainer" style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>{translate("orders.empty")}</h2>
            <Link to="/catalog" >{translate("orders.shopping")}</Link>
          </div>
        </div>
      );
    }
    else{
      return (
        <div className="mainContainer" style={{ alignContent: "center", alignItems: "center", alignSelf: "center" }}>
          <h1>{translate("orders.title")}</h1>
          <div style={{ alignContent: "center", alignItems: "center" }}>
            <TableContainer component={Paper} sx={{ maxHeight: "440", maxWidth: "1000", alignSelf: "center" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={1}>
                      {translate("orders.preview")}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {translate("orders.id")}
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      {translate("orders.products")}
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                      {translate("orders.price")}
                    </TableCell>
                    <TableCell align="center" colSpan={5}>
                      {translate("orders.iva")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {<DisplayOrders key={"orders"} orders={orders} />}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="goToCatalogButtonOrders">
            <Button
              onClick={() => window.location.assign("/catalog")}
              style={{
                borderRadius: 15,
                backgroundColor: "#e8e8e8",
                padding: "15px 30px",
                fontSize: "13px",
                color: "black"
              }}
            >{translate('orders.shopping')}</Button>
          </div>
          
          <GoToTopButton />
        </div>
      );
    }
  }
}

export default OrdersPage;
