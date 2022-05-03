import { Fragment, FC, useState, useContext } from "react";
import { Container, Card, CardContent } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "bootswatch/dist/morph/bootstrap.min.css"
import { deleteProduct, deleteProductInDistributionCenter } from "../api/api";
import { LangContext } from '../lang';
import Home from '../pages/HomePage';

interface CrudPageProps {
    setUser: (user: string) => void
}

const isBlank = (text: string) => {
    return (text.length === 0);
}

const CrudDeletePage: FC<CrudPageProps> = (props: CrudPageProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [id, setId] = useState('');

    const deleteProductAux = async () => {
        if (!isBlank(id)) {
            try {
                await deleteProduct(id);
            } catch (error) {
                console.log("Error al eliminar un producto");
            }
        }
    }

    const [centerId, setCenterId] = useState<string>("");
    const [productId, setProductId] = useState("");

    const addProductToDistCenter = async () => {
        try {
            await deleteProductInDistributionCenter(centerId, productId);
        } catch (error) {
            console.log("Error al añadir el producto al centro de distribución");
        }
    }

    if (!localStorage.getItem("currentUser")?.includes("admin")) {
        return (<Home setUser={props.setUser} />)
    }
    else {
        return (
            <div>
                <Container component="main" maxWidth="sm">
                    <Card className={"main"} elevation={10} style={{ display: "grid" }}>
                        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                            <h3 aria-label="deleteProductTitle">{translate('crud.delete')}</h3>
                            <Fragment>
                                <form>
                                    <TextField
                                        required
                                        size="small"
                                        id="standard-helperText"
                                        label="deleteProduct"
                                        variant="outlined"
                                        sx={{ my: 2 }}
                                        value={id}
                                        onChange={e => setId(e.target.value)}
                                    />
                                </form>
                            </Fragment>
                            <Button onClick={() => deleteProductAux()} variant="contained" type="submit" sx={{ my: 2 }} aria-label="deleteButton">{translate('crud.delete')}</Button>
                        </CardContent>
                    </Card>

                    <Card className={"main"} elevation={10} style={{ display: "grid" }}>
                        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                            <h3 aria-label="deleteProductCenterTitle">Delete product in distribution center</h3>
                            <Fragment>
                                <form id="deleteInCenter">
                                    <TextField
                                        required
                                        size="small"
                                        id="distcentid"
                                        label="T-Dist cent ID"
                                        variant="outlined"
                                        sx={{ my: 2 }}
                                        value={centerId}
                                        onChange={e => setCenterId(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        size="small"
                                        id="distcentproduct"
                                        label="T-Product ID"
                                        variant="outlined"
                                        sx={{ my: 2 }}
                                        value={productId}
                                        onChange={e => setProductId(e.target.value)}
                                    />
                                </form>
                            </Fragment>
                            <Button onClick={() => addProductToDistCenter()} variant="contained" type="submit" sx={{ my: 2 }} aria-label="deleteCenterButton">Delete product in distribution center</Button>
                        </CardContent>
                    </Card>

                </Container>
            </div>
        )
    }
}
export default CrudDeletePage;