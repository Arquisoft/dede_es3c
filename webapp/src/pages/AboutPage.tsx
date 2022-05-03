import { useContext } from "react";
import logo from '../img/logo-dede.svg';
import { LangContext } from '../lang';
import '../styles/About.scss';
import HorizontalSeparator from '../components/HorizontalSeparator';
import Footer from '../components/Footer';

const HomePage = () => {
    const { dispatch: { translate } } = useContext(LangContext);
 
    return (
        <>
            <div>
                <img alt="Logo" src={logo} className="logoAbout" aria-label="logoDeDesktop"/>
            </div>

            <HorizontalSeparator />

            <div className="containerAbout">
                <div>
                    <img src="https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256351/image_gallery_hree0f.jpg" alt="imagenFacultad" className="photoAbout" />
                </div>
                <div className="textAbout">
                    <h3>{translate("about.what.title")}</h3>
                    <p>{translate("about.what.text1")}</p>
                    <p>{translate("about.what.text2")}</p>
                </div>
                <div className="textAbout">
                    <h3>{translate("about.expect.title")}</h3>
                    <p>{translate("about.expect.text")}</p>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dg9za4xcz/image/upload/v1651266989/Logo-color_nbmsey.gif" alt="imagenArquisoft" className="photoAbout" />
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dg9za4xcz/image/upload/v1651266997/github-cover_sevavn.jpg" alt="imagenGit" className="photoGitAbout" />
                </div>
                <div className="textAbout">
                    <h3>{translate("about.info.title")}</h3>
                    <p>{translate("about.info.text")}</p>
                    <a href="https://github.com/Arquisoft/dede_es3c">{translate("about.info.link1")}</a>
                    <br></br>
                    <a href="https://arquisoft.github.io/dede_es3c/">{translate("about.info.link2")}</a>
                </div>

            </div>

            <div className="footerPositionAbout">
                <Footer />
            </div>
        </>
    )
}
export default HomePage;