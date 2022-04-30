import { FC, useContext } from "react";
import logo from '../img/logo-dede.svg';
import { LangContext } from '../lang';
import '../styles/About.scss';
import HorizontalSeparator from '../components/HorizontalSeparator';
import Footer from '../components/Footer';

interface HomePageProps {
    setUser: (user: string) => void
}

const HomePage: FC<HomePageProps> = (props: HomePageProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
 
    return (
        <>
            <div>
                <img alt="Logo" src={logo} className="logoAbout" />
            </div>

            <HorizontalSeparator />

            <div className="containerAbout">
                <div>
                    <img src="https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256351/image_gallery_hree0f.jpg" className="photoAbout" />
                </div>
                <div className="textAbout">
                    <h3>¿Qué es DeDesktop?</h3>
                    <p>DeDesktop es el trabajo en grupo desarrollado por Sonia, Nuria, Sergio y Alejandro para la asignatura Arquitectura del Software.</p>
                    <p>En ella se ha desarrollado una tienda de productos informáticos en React-Typescript y Node.js.</p>
                </div>
                <div className="textAbout">
                    <h3>¿Qué podemos esperarnos de este proyecto?</h3>
                    <p>DeDesktop tiene la mayoría de funcionalidades que tendría una tienda online convencional. En ella podemos registrarnos como usuarios,
                        acceder a sesión con nuestro nombre de usuario, ver el catálogo de productos o hacer compras entre otras funcionalidades.
                        La principal diferencia con otras tiendas es cómo tratamos los datos de nuestros clientes. Tratamos de tener la mayor descentralización
                        posible de la información de los clientes. Para ello se ha desarrollado el proyecto con una tecnología muy novedosa llamada Solid.</p>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dg9za4xcz/image/upload/v1651266989/Logo-color_nbmsey.gif" className="photoAbout" />
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dg9za4xcz/image/upload/v1651266997/github-cover_sevavn.jpg" className="photoGitAbout" />
                </div>
                <div className="textAbout">
                    <h3>Más información</h3>
                    <p>Desde los siguientes enlaces se puede acceder a la documentación del proyecto y al repositorio donde se ha desarrollado:</p>
                    <a href="https://github.com/Arquisoft/dede_es3c">Repositorio del proyecto en GitHub</a>
                    <br></br>
                    <a href="https://arquisoft.github.io/dede_es3c/">Documentación del proyecto en GitHub</a>
                </div>

            </div>

            <div className="footerPositionAbout">
                <Footer />
            </div>
        </>
    )
}
export default HomePage;