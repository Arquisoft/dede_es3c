import React, { Fragment, FC, useEffect, useState } from "react";
import Header from "../components/Header";
import { Container, Card, CardContent, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "bootswatch/dist/minty/bootstrap.min.css";
import { Product } from "../shared/shareddtypes";
import { addProduct } from "../api/api"

interface CrudPageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

const isBlank = (text: string) => {
    return (text.length == 0);
}

const CrudAddPage: FC<CrudPageProps> = (props: CrudPageProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [urlPhoto, setUrlPhoto] = useState('');

    const addProductAux = async () => {
        const product: Product = {name: name, description: description, price: Number(price), category: category, urlPhoto: urlPhoto}

        if (isBlank(product.name) || isBlank(product.description) || isBlank(product.category) || isBlank(product.urlPhoto)) {
            console.log("novalido");
        } else {
            await addProduct(product);
        }
    }

    return (
        <div>
            <Header setUser={props.setUser} />
            <Container component="main" maxWidth="sm">
                <Card className={"main"} elevation={10} style={{ display: "grid" }}>
                    <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                        <h3>Añadir un producto</h3>
                        <Fragment>
                            <form id="add">
                                <TextField
                                    required
                                    size="small"
                                    id="standard-helperText"
                                    label="Nombre"
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
                                        <MenuItem value="Laptop">Laptop</MenuItem>
                                        <MenuItem value="Monitors">Monitors</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Fragment>
                        <Button onClick={() => addProductAux()} variant="contained" type="submit" sx={{ my: 2 }}>Añadir producto</Button>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}
export default CrudAddPage;