import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../lang';
import '../styles/Footer.scss';

const Footer = () => {
    const { dispatch: { translate } } = useContext(LangContext);

    return (
        <>

        <div className="containerFooter">
            <div>
                <p>{translate("footer.who")}</p>
                <Link to="/about">{translate("footer.about")}</Link>
            </div>
            <div>
                <p>{translate("footer.contact")}</p>
                <p>Sonia - UO276237@uniovi.es</p>
                <p>Nuria - UO277418@uniovi.es</p>
                <p>Sergio - UO276341@uniovi.es</p>
                <p>Alejandro - UO232627@uniovi.es</p>
            </div>
            <div>
                <img src="https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256318/logo_ae2o6f.png" className="photoFooter" alt="logoUniovi" aria-label='imagenUniovi'/>
            </div>
        </div>
        </>
    );

}

export default Footer;