import React, {FC, useState, useEffect, useContext} from "react";
import { User } from "../shared/shareddtypes";
import {getUsers } from "../api/api";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Paper, Table, TableContainer, TableHead } from "@mui/material";
import { LangContext } from "../lang";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router";
import DisplayClients from "../components/DisplayClients";
import GoToTopButton from '../components/GoToTopButton';

interface ClientViewProps {
    setUser:(user:string) => void
}

const ClientView: FC<ClientViewProps> = (props: ClientViewProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [users, setUsers] = useState<User[]>([]);
    const reloadItems = async () => {
        if (localStorage.getItem("currentUser")?.includes("admin")){
          try {
            setUsers(await getUsers());
          } catch (error) {
            console.log("Error al recuperar los usuarios");
          }
        }
  }

  useEffect(() => {
      reloadItems();
    }, []);

    const redirect = () => {
        <Navigate to={"/catalog"}/>
    }

    if (!localStorage.getItem("currentUser")?.includes("admin")){
        return (
        <div className="main">
            <div className="mainEmptyContainer" style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <h2>{translate("clients.notAllowed")}</h2>
            <Button onClick={() => redirect()} >{translate("orders.shopping")}</Button>  
            </div>
        </div>
        );
    } 
    return (
        <div className="mainContainer" style={{alignContent:"center", alignItems:"center", alignSelf:"center"}}>
            <h1 aria-label="clientsTitleWith">{translate("clients.title")}</h1>
            <div style={{ alignContent:"center", alignItems:"center" }}>
              <TableContainer component={Paper} sx={{maxHeight: "440",maxWidth: "1000" , alignSelf:"center"}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow key={"Users"}>
                  <TableCell align="center" colSpan={1}>
                      {translate("clients.username")}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {translate("clients.email")}
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                    {translate("clients.rol")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <DisplayClients users={users} />               
                </TableBody>
              </Table>
            </TableContainer>
            </div>
          <GoToTopButton />
        </div>
        
    );

}

export default ClientView;
