import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import HeroHeader from "../Components/HeroHeader/HeroHeader";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";

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
        { title: "Uslovi registracije", link: "/uslovi-registracije" },
        { title: "Uslovi plaćanja", link: "/uslovi-placanja" },
        { title: "Odgovornost veb stranice", link: "/odgovornost" },
    ];

    return (
        <>
            <Header />
            <HeroHeader header={"O nama"} />
            <div className="about-us-container">
                {/* Informacije o kompaniji */}
                <div className="about-us">
                    <ul>
                        {companyInfo.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

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
            <Footer />
        </>
    );
}
