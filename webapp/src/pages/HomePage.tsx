import React, { Fragment, FC, useEffect, useState } from "react";
import Header from "../components/Header";
import logo from '../img/logo-dede.svg';
import { Container, Card, CardContent, Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";


interface HomePageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

const HomePage: FC<HomePageProps> = (props: HomePageProps) => {
    const [page, setPage] = useState('');

    if(page === 'catalog'){
        return(
            <Navigate to="/catalog" />
        )
    }
    else if (page === 'login'){
        return (
            <Navigate to="/login" />
        )
    }
    else if (page === 'signup'){
        return (
            <Navigate to="/signup" />
        )
    }
    else{
        return (
            <div>
                <Header setUser={props.setUser} />
                <Container component="main" maxWidth="sm">
                    <Card className={"main"} elevation={10} style={{ display: "grid" }}>
                        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                            <div>
                                <img width={400} height={400} src={logo} />
                            </div>
                            <p>DeDesktop es el resultado del esfuerzo y dedicación del grupo es3c de la asignatura Arquitectura del Software.</p>
                            <p>DeDesktop es una tienda de productos informáticos desarrollada en React y Node.js. En ella tenemos las mismas opciones que en una tienda convencional, como puede ser registrarse, ver el catálogo de productos o hacer una compra.
                                La novedad viene en como tratamos los datos de nuestros clientes. Para evitar en la medida de lo posible la descentralización de los datos, estamos usando una tecnología llamada Solid. Con ella, podemos dejar que el cliente sea el responsable de sus propios datos. Así, nosotros solo tenemos información relacionada con su cuenta, como nombre de usuario o los pedidos que ha realizado.</p>
                            <p>Con este proyecto pretendemos hacer llegar a la gente (y a nuestros profesores) la viabilidad de un sistema novedoso como Solid, además de mejorar con el uso de las tecnologías React y Node.</p>
                            <Button onClick={() => setPage('catalog')} type="submit" variant="contained" sx={{ my: 2 }}>Accede a nuestro catálogo</Button>
                            <Button onClick={() => setPage('login')} variant="contained" sx={{ my: 2 }}>No tienes cuenta? Regístrate</Button>
                            <Button onClick={() => setPage('signup')} variant="contained" sx={{ my: 2 }}>Ya tienes cuenta? Accede</Button>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        )
    }

    
}
export default HomePage;