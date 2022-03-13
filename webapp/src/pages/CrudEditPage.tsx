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


const CrudEditPage: FC<CrudPageProps> = (props: CrudPageProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [urlPhoto, setUrlPhoto] = useState('');
    const [id, setId] = useState('');

    const updateProduct = async () => {
        const product: Product = { name: name, description: description, price: Number(price), category: category, urlPhoto: urlPhoto }

        if (isBlank(product.name) || isBlank(product.description) || isBlank(product.category) || isBlank(product.urlPhoto) || isBlank(id)) {
            console.log("novalido");
        } else {
            //await updateProduct(id, product);
            console.log("actualizado");
        }
    }

    return (
        <div>
            <Header setUser={props.setUser} />
            <Container component="main" maxWidth="sm">
                <Card className={"main"} elevation={10} style={{ display: "grid" }}>
                    <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                        <h3>Actualizar un producto</h3>
                        <Fragment>
                            <form id="edit">
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
                                <TextField
                                    required
                                    size="small"
                                    id="standard-helperText"
                                    label="NombreEdit"
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <TextField
                                    required
                                    size="small"
                                    id="standard-helperText"
                                    label="Descripción"
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                                <TextField
                                    required
                                    size="small"
                                    id="standard-helperText"
                                    label="Precio"
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                                <TextField
                                    required
                                    size="small"
                                    id="standard-helperText"
                                    label="URL de la foto"
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    value={urlPhoto}
                                    onChange={e => setUrlPhoto(e.target.value)}
                                />
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Categoría</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label-standar"
                                        id="demo-simple-select-standar"
                                        value={category}
                                        label="Categoria"
                                        onChange={e => setCategory(e.target.value)}
                                        size="small"
                                        sx={{ my: 2 }}
                                    >
                                        <MenuItem value={10}>Laptop</MenuItem>
                                        <MenuItem value={20}>Monitors</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Fragment>
                        <Button onClick={() => updateProduct()} variant="contained" type="submit" sx={{ my: 2 }}>Actualizar producto</Button>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}
export default CrudEditPage;