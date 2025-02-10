import { Link } from "react-router-dom";
import image from '../../assets//images/iznajmi-07.png'
import ScrollToTop from "../../utils/ScrollToTop";
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useContext } from "react"
import { AuthContext } from "../../Contexts/AuthContextHelper"
export default function Footer({ onClick }) {
    const navigate = useNavigate();
    const email = "info@iznajmi.me";
    const { token, isTokenValid } = useContext(AuthContext);
    const isAuthenticated = isTokenValid(token);


    const sectionLogo = {
        image: image,
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
                { text: "Uslovi registracije", url: "/uslovi-registracije" },
                { text: "Uslovi plaćanja", url: "/uslovi-placanja" },
                { text: "Odgovornost veb stranice", url: "/odgovornost" }
            ]
        }
    ];
    const navigateTo = () => {
        navigate('/dashboard');
    }

    return (
        <footer>
            <ScrollToTop />
            <hr />
            <div className="content">
                <div className="footer-section logo">
                    <img src={sectionLogo.image} alt="logo 300x50" />
                    <p>
                        {sectionLogo.content}
                        <a href={`mailto:${email}`}>{email}</a>
                    </p>
                    <div className="navlinks-button">
                        <motion.button
                            onClick={isAuthenticated ? navigateTo : onClick}
                            whileTap={{ scale: 1.1 }}
                            whileHover={{
                                scale: 0.95,
                                transition: { duration: 0.05 },
                            }}
                            id="login"
                        >
                            {isAuthenticated ? ' Profil' : 'Login'}
                        </motion.button>
                    </div>

                </div>
                {sections.map((section) => (
                    <div key={section.id} className="footer-section">
                        <h2>{section.header}</h2>
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
