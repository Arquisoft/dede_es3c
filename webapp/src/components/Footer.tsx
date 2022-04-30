import { Link } from 'react-router-dom';
import '../styles/Footer.scss';

const Footer = () => {

    return (
        <>

        <div className="containerFooter">
            <div>
                <p>¿Quiénes somos?</p>
                <Link to="/about">Sobre nosotros</Link>
            </div>
            <div>
                <p>Contactar</p>
                <p>Sonia - UO276237@uniovi.es</p>
                <p>Nuria - UO277418@uniovi.es</p>
                <p>Sergio - UO276341@uniovi.es</p>
                <p>Alejandro - UO232627@uniovi.es</p>
            </div>
            <div>
                <img src="https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256318/logo_ae2o6f.png" className="photoFooter"/>
            </div>
        </div>
        </>
    );

}

export default Footer;