import { Link } from "react-router-dom";
import image from '../../assets//images/logo.png'

export default function Footer() {
    const email = "info@iznajmi.me";

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
                { text: "O nama", url: "/o-nama" }
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

    return (
        <footer>
            <hr />
            <div className="content">
                <div className="footer-section logo">
                    <img src={sectionLogo.image} alt="logo 300x50" />
                    <p>
                        {sectionLogo.content}
                        <a href={`mailto:${email}`}>{email}</a>
                    </p>
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
