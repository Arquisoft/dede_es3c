import React, {Fragment, FC, useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import "bootswatch/dist/lumen/bootstrap.min.css";
import Button from '@mui/material/Button';
import {Container, Card , CardContent, Grid} from "@mui/material";
import Link from '@mui/material/Link';

interface LoginPageProps {
    translate: (key: string) => string
}

const LoginPage: FC<LoginPageProps> = ({ translate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginPod, setLoginPod] = useState(false);
    return(
    <div>
        <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>

                <h1>{translate('login.h1')}</h1>
                <h3>{translate('login.h2')}</h3>
                    <Fragment>
                        <form>
                            <TextField
                        required
                        size="small"
                        name="username"
                        label= {translate ('login.solidUser')} 
                        variant="outlined"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        sx={{ my: 2 }}
                        /> 

                        <TextField
                        required
                        name="password"
                        type={"password"}
                        size="small"
                        label= {translate ('login.solidPass')} 
                        variant="outlined"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        sx={{ my: 2 }}
                        /> 
                        </form>
                    </Fragment>
                    <Button variant="contained" type="submit" sx={{ my: 2 }}>{translate('login.solid')}</Button>
            <Link href="https://inrupt.net/register">{translate('login.signup')}</Link>
            </CardContent>
            </Card>
        </Container>
    </div>
    );
  }
  export default LoginPage;