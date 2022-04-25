import React, {Fragment, FC, useState, useContext} from "react";
import TextField from '@mui/material/TextField';
import {Container, Card , CardContent } from "@mui/material";
import logo from '../img/logo-dede.svg'
import {checkUser, getUser, loginB } from "../api/api";
import "bootswatch/dist/morph/bootstrap.min.css"
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import { LangContext } from '../lang';
import { Link } from 'react-router-dom';

const checkParams = (text: string) => {
    return text === "" || text === null;
}

interface LoginPageProps {
    setUser:(user:string) => void
}
const LoginPage: FC<LoginPageProps> = (props: LoginPageProps) => {
  const { dispatch: { translate } } = useContext(LangContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pulsed, setPulsed] = useState(false);
    const [token, setToken] = useState('')

    const errorNotification = () => {
      Swal.fire({
        title: "Error",
        text: translate("login.singin.error"),
        icon: "error",
    });
    return;
    }

    const checkLog = async () => {
        setPulsed(true);
          const valid = await checkUser(username, password);
          if (valid) {
              const user = await getUser(username);
              let res = await loginB(username, password)
              setToken(res);
              console.log("token: " + res);
              if (user.rol === "Admin") {
                const adminName = "admin " + user.username;
                props.setUser(adminName);
              } else {
                props.setUser(user.username);
              }
              localStorage.setItem("currentEmail", user.email);
              localStorage.setItem("token", res);
              Swal.fire({
                title: translate("login.welcome") + user.username,
                icon: "success"
            }).then(() => {
                window.location.assign("/catalog");
            });
        } else {
          Swal.fire({
            title: "Error",
            text: translate("login.singin.error"),
            icon: "error",
        });
        }
};

    return(
    <div>
        <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
            <div>
            <img alt="LogoLogIn" width={150} height = {150} src={logo} />
            </div>
                <h1>{translate('login.h1')}</h1>
                <h3>{translate('login.h2')}</h3>
                    <Fragment>
                        <form>
                            <TextField
                        id = "textUser"
                        required
                        size="small"
                        name="username"
                        label= {translate ('login.solidUser')} 
                        variant="outlined"
                        value={username}
                        error = {(checkParams(username) && pulsed)}
                        helperText= {translate('login.input')}
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
                        value={password} error = {checkParams(password) && pulsed}
                        onChange={e => setPassword(e.target.value)}
                        helperText= {translate('login.input')}
                        sx={{ my: 2 }}
                        /> 
                        </form>
                    </Fragment>
                    <Button onClick={() => checkLog()} variant="contained" type="submit" aria-label="loginButton">{translate('login.solid')}</Button>
                <Link to="/signup">{translate('login.signup')}</Link>
              </CardContent>
            </Card>
        </Container>
    </div>
    );
} 
  export default LoginPage;
