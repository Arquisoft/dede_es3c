import { Fragment, FC, useState, useContext } from "react";
import Header from "../components/Header";
import { Container, Card, CardContent } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "bootswatch/dist/morph/bootstrap.min.css"
import { deleteProduct } from "../api/api";
import { LangContext } from '../lang';

interface CrudPageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

const isBlank = (text: string) => {
    return (text.length == 0);
}

const CrudDeletePage: FC<CrudPageProps> = (props: CrudPageProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [id, setId] = useState('');

    const deleteProductAux = async () => {
        if (isBlank(id)) {
            console.log("novalido");
        } else {
            await deleteProduct(id);
        }
    }

    return (
        <div>
            <Header setUser={props.setUser} />
            <Container component="main" maxWidth="sm">
                <Card className={"main"} elevation={10} style={{ display: "grid" }}>
                    <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                        <h3>{translate('crud.delete')}</h3>
                        <Fragment>
                            <form>
                                <TextField
                                    required
                                    size="small"
                                    id="standard-helperText"
                                    label={translate('crud.ID')}
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    value={id}
                                    onChange={e => setId(e.target.value)}
                                />
                            </form>
                        </Fragment>
                        <Button onClick={() => deleteProductAux()} variant="contained" type="submit" sx={{ my: 2 }}>{translate('crud.delete')}</Button>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}
export default CrudDeletePage;