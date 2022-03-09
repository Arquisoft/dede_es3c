import React, {Fragment, FC, useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import "bootswatch/dist/superhero/bootstrap.min.css"
import Button from '@mui/material/Button';
import {Container, Card , CardContent, Grid} from "@mui/material";
import Link from '@mui/material/Link';
import logo from '../img/logo-dede.svg'
import SignUpPage from './SignUpPage'
import { addUser, checkUser, getUser, login } from "../api/api";
import { User } from "../shared/shareddtypes";
import { Alert} from "@mui/material"
import {Navigate} from "react-router-dom";


const checkParams = (text: string) => {
    return text == "" || text == null;
}

interface LoginPageProps {
    setSession: (user: User) => void;
    translate: (key: string) => string
}
const LoginPage: FC<LoginPageProps> = (props: LoginPageProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pulsed, setPulsed] = useState(false);
    const [logged, setLogged] = useState(false);

    const checkLog = async () => {
          const token = await login(username, password);
          localStorage.setItem("token", token);
          console.log("logged")
          if (token != null) {
              props.setSession(await getUser(username));;
              setLogged(true);
          } else {
              <Alert>
                  {props.translate("login.singin.error")}
              </Alert>
           }
};

    if (logged){
        return ( <Navigate to="/" />);
    }
    return(
    <div>
        <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
            <div>
            <img  width={150} height = {150} src={logo} />
            </div>
                <h1>{props.translate('login.h1')}</h1>
                <h3>{props.translate('login.h2')}</h3>
                    <Fragment>
                        <form>
                            <TextField
                        id = "textUser"
                        required
                        size="small"
                        name="username"
                        label= {props.translate ('login.solidUser')} 
                        variant="outlined"
                        value={username}
                        error = {(checkParams(username) && pulsed)}
                        helperText= {props.translate('login.input')}
                        onChange={e => setUsername(e.target.value)}
                        sx={{ my: 2 }}
                        /> 

                        <TextField
                        required
                        name="password"
                        type={"password"}
                        size="small"
                        label= {props.translate ('login.solidPass')} 
                        variant="outlined"
                        value={password} error = {checkParams(password) && pulsed}
                        onChange={e => setPassword(e.target.value)}
                        helperText= {props.translate('login.input')}
                        sx={{ my: 2 }}
                        /> 
                        </form>
                    </Fragment>
                    <Button onClick={() => checkLog()} variant="contained" type="submit" sx={{ my: 2 }}>{props.translate('login.solid')}</Button>
            <Link href="/signup">{props.translate('login.signup')}</Link>
            </CardContent>
            </Card>
        </Container>
    </div>
    );
}
  export default LoginPage;
