
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Layout from "../Components/Layout/Layout";
import { useEffect } from "react";

export default function AboutUs() {
    const companyInfo = [
        "Naziv: MANARE doo Subotica",
        "Adresa: Senćanski Put 63",
        "Pošta i mesto: 24000 Subotica",
        "Region: Severno-Bački",
        "Država: Srbija",
        "Matični broj: 21182117",
        "Poreski broj: 109436805",
        "Pravni oblik: Društvo sa ograničenom odgovornošću",
        "Delatnost: Nespecijalizovana trgovina na veliko",
        "Email: info@iznajmi.me",
    ];

    const politike = [
        { title: "Politika privatnosti", link: "/politika-privatnosti" },
        { title: "Politika reklamacije", link: "/politika-reklamacije" },
        { title: "Politika otkazivanja", link: "/politika-otkazivanja" },
    ];

    const usloviVebStranice = [
        { title: "Uslovi rezervacije", link: "/uslovi-rezervacije" },
        { title: "Uslovi plaćanja", link: "/uslovi-placanja" },
        { title: "Odgovornost veb stranice", link: "/odgovornost" },
    ];

    useEffect(() => {
        document.title = 'Iznajmi me - O nama'
    })


    return (
        <Layout heroHeader={true} header={'O nama'}>
            <div className="about-us-container">
                <p style={{ marginTop: '30px', marginBottom: '20px' }}>
                    Iznajmi.me is a platform with a goal to solve a simple problem, renting vehicles, we aim to streamline the entire process and make it much easier for everyone. By having every trusted agency on one platform, you don't have to search various questionable websites, trying to find a trustworthy car rental agency

                </p>

                <p style={{ marginTop: '20px', marginBottom: '40px' }}>
                    Iznajmi.me je platforma osnovana da resi jedan jednostavan problem, širok i nesiguran izbor iznajmljivanja vozila, nas cilj jeste da olaksamo ceo proces za sve, tako sto okupljamo sve proverene i pouzdane agencije na jedno mesto, bez da pretrazujete nepoznate sajtove pokusavajuci da nadjete rent a car agenciju kojoj mozete verovati
                </p>
                {/* <div className="about-us">
                    <ul>
                        {companyInfo.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div> */}

                {/* Politike */}
                <div className="policies">
                    <h3>Politike</h3>
                    <ul>
                        {politike.map((policy, index) => (
                            <li key={index}>
                                <a href={policy.link} className="policy-link">
                                    {policy.title} <FontAwesomeIcon icon={faChevronRight} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Uslovi veb stranice */}
                <div className="terms">
                    <h3>Uslovi veb stranice</h3>
                    <ul>
                        {usloviVebStranice.map((term, index) => (
                            <li key={index}>
                                <a href={term.link} className="terms-link">
                                    {term.title} <FontAwesomeIcon icon={faChevronRight} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>

    );
}
