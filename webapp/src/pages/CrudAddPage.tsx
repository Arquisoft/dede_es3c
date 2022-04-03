import React, { Fragment, FC, useState, useContext } from "react";
import Header from "../components/Header";
import { Container, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "bootswatch/dist/morph/bootstrap.min.css"
import { Product } from "../shared/shareddtypes";
import { addProduct } from "../api/api"
import { LangContext } from '../lang';
import Home from '../pages/HomePage';

interface CrudPageProps {
    setUser: (user: string) => void
}

const isBlank = (text: string) => {
    return (text.length === 0);
}

const CrudAddPage: FC<CrudPageProps> = (props: CrudPageProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [urlPhoto, setUrlPhoto] = useState('');

    const addProductAux = async () => {
        const product: Product = {name: name, description: description, price: Number(price), category: category, urlPhoto: urlPhoto, amount: 0}

        if (!isBlank(product.name) || !isBlank(product.description) || !isBlank(product.category) || !isBlank(product.urlPhoto)) {
            await addProduct(product);
        }
    }
    if (!localStorage.getItem("currentUser")?.includes("admin")) {
        return (<Home setUser={props.setUser} />)
    }
    else {
        return (
            <div>
                <Header setUser={props.setUser} />
                <Container component="main" maxWidth="sm">
                    <Card className={"main"} elevation={10} style={{ display: "grid" }}>
                        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                            <h3 aria-label="addProductTitle">{translate('crud.add')}</h3>
                            <Fragment>
                                <form id="add">
                                    <TextField
                                        required
                                        size="small"
                                        id="standard-helperText"
                                        label={translate('crud.name')}
                                        variant="outlined"
                                        sx={{ my: 2 }}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        size="small"
                                        id="standard-helperText"
                                        label={translate('crud.description')}
                                        variant="outlined"
                                        sx={{ my: 2 }}
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        size="small"
                                        id="standard-helperText"
                                        label={translate('crud.price')}
                                        variant="outlined"
                                        sx={{ my: 2 }}
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        size="small"
                                        id="standard-helperText"
                                        label={translate('crud.URL')}
                                        variant="outlined"
                                        sx={{ my: 2 }}
                                        value={urlPhoto}
                                        onChange={e => setUrlPhoto(e.target.value)}
                                    />
                                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">{translate('crud.category')}</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label-standar"
                                            id="demo-simple-select-standar"
                                            value={category}
                                            label={translate('crud.category')}
                                            onChange={e => setCategory(e.target.value)}
                                            size="small"
                                            sx={{ my: 2 }}
                                        >
                                            <MenuItem value="Laptop">{translate('category.laptop')}</MenuItem>
                                            <MenuItem value="Monitors">{translate('category.monitors')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>
                            </Fragment>
                            <Button onClick={() => addProductAux()} variant="contained" type="submit" sx={{ my: 2 }} aria-label="addButton">{translate('crud.add')}</Button>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        )
    }
}
export default CrudAddPage;