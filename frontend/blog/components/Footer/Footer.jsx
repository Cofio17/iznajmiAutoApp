import Link from "next/link";
import styles from './Footer.module.scss'
export default function Footer() {

    const email = "info@iznajmi.me";
    const sectionLogo = {
        image: '/logo.png',
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


    return (
        <footer className={styles.footer}>
            <hr />
            <div className={styles.content}>
                <div className={styles['footer-section']} >
                    <img src='/blog/logo.png' alt="logo 300x50" />
                    <p>
                        {sectionLogo.content}
                        <a href={`mailto:${email}`}>{email}</a>
                    </p>
                </div>
                {sections.map((section) => (
                    <div key={section.id} className={styles['footer-section']}>
                        <h2>{section.header}</h2>
                        <div className={styles.links}>
                            {section.links.map((link, index) => (
                                <Link key={index} href={link.url}>
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
