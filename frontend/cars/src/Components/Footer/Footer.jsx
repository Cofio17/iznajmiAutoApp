import { Link } from "react-router-dom";
import logo from '../../assets//images/logo.webp'
import ScrollToTop from "../../utils/ScrollToTop";
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../Contexts/AuthContextHelper"
import MotionButton from "../MotionButton/MotionButton";
export default function Footer({ onClick }) {
    const navigate = useNavigate();
    const email = "info@iznajmi.me";
    const { token, isTokenValid } = useContext(AuthContext);
    const isAuthenticated = isTokenValid(token);


    const sectionLogo = {
        logo: logo,
        content: `Ako imate bilo kakva pitanja ili potrebu za pomoć, molimo Vas da nas kontaktirate putem mejla `
    };

    const sections = [
        {
            id: 1,
            header: "Politika Veb Stranice",
            links: [
                { text: "Politika privatnosti", url: "/politika-privatnosti" },
                { text: "Politika reklamacije", url: "/politika-reklamacije" },
                { text: "Politika otkazivanja", url: "/politika-otkazivanja" },
                { text: "O nama", url: "/about_us" }
            ]
        },
        {
            id: 2,
            header: "Uslovi Veb Stranice",
            links: [
                { text: "Uslovi rezervacije", url: "/uslovi-rezervacije" },
                { text: "Uslovi plaćanja", url: "/uslovi-placanja" },
                { text: "Odgovornost veb stranice", url: "/odgovornost" }
            ]
        }
    ];
    const navigateToDashboard = () => {
        navigate('/dashboard');
    }

    return (
        <footer>
            <ScrollToTop />
            <hr />
            <div className="content">
                <div className="footer-section logo">
                    <img src={sectionLogo.logo} alt="logo 300x50" />
                    <p>
                        {sectionLogo.content}
                        <a href={`mailto:${email}`}>{email}</a>
                    </p>
                    <div className="navlinks-button">
                        <MotionButton id='login' onClick={isAuthenticated ? navigateToDashboard : onClick} text={isAuthenticated ? ' Portal' : 'Login'} />
                    </div>

                </div>
                {sections.map((section) => (
                    <div key={section.id} className="footer-section">
                        <h3>{section.header}</h3>
                        <div className="links">
                            {section.links.map((link, index) => (
                                <Link key={index} to={link.url}>
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <hr />
        </footer>
    );
}
