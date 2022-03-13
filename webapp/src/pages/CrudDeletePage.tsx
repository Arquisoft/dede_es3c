import React, { Fragment, FC, useEffect, useState } from "react";
import Header from "../components/Header";
import logo from '../img/logo-dede.svg';
import { Container, Card, CardContent, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { checkUser, getUser, loginB } from "../api/api";
import "bootswatch/dist/minty/bootstrap.min.css"
import { addProduct } from "../api/api";
import { Product } from "../shared/shareddtypes";
import {updateProduct} from "../api/api";

interface CrudPageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

const isBlank = (text: string) => {
    return (text.length == 0);
}


const CrudDeletePage: FC<CrudPageProps> = (props: CrudPageProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [urlPhoto, setUrlPhoto] = useState('');
    const [id, setId] = useState('');

    const deleteProduct = async () => {
        if (isBlank(id)) {
            console.log("novalido");
        } else {
            //await deleteProduct(id);
            console.log("eliminado");
        }
    }

    return (
        <div>
            <Header setUser={props.setUser} />
            <Container component="main" maxWidth="sm">
                <Card className={"main"} elevation={10} style={{ display: "grid" }}>
                    <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                        <h3>Eliminar un producto</h3>
                        <Fragment>
                            <form>
                                <TextField
                                    required
                                    size="small"
                                    id="standard-helperText"
                                    label="ID"
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    value={id}
                                    onChange={e => setId(e.target.value)}
                                />
                            </form>
                        </Fragment>
                        <Button onClick={() => deleteProduct()} variant="contained" type="submit" sx={{ my: 2 }}>Eliminar producto</Button>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}
export default CrudDeletePage;