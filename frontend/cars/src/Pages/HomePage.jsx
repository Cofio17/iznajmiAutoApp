import '../style.scss'
import SectionComponent from '../Components/HomeSections/SectionComponent'
import CityComponent from '../Components/CityComponent/CityComponent'
import SectionItem from '../Components/HomeSections/SectionItem'
import { faKey, faCar, faHandshake } from '@fortawesome/free-solid-svg-icons'
import Search from '../Components/SearchPageComponents/Search';
import { useEffect } from 'react';
import SliderCarousel from '../Components/Slider/SliderCarousel'
import Layout from '../Components/Layout/Layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function HomePage() {

    // useEffect(() => {
    //     document.title = 'Iznajmi me - Pocetna'
    // })

    const sectionData = {
        header: "Iznajmi auto u 3 laka koraka?",
        details: "Jednostavno pronađete željeno vozilo, rezervišete i preuzmete",
        steps: [

            {
                id: "01",
                title: "Pronađite",
                description:
                    " Prosto kliknite na 'Rent a car', podesite filtere i pronađite vozilo koje vam najviše odgovara.",
                icon: faCar
            },
            {
                id: "02",
                title: "Rezervišite",
                description:
                    "Nakon odabira datuma i provere da vozilo ispunjava vaše potrebe, kliknite na 'Rezerviši' i unesite svoje podatke. Ubrzo ćete dobiti e-mail sa potvrdom.",
                icon: faHandshake
            },
            {
                id: "03",
                title: "Preuzmite",
                description:
                    "U potvrdi rezervacije pronaći ćete adresu i kontakt telefon. Jednostavno preuzmite vozilo i uživajte u vožnji!",
                icon: faKey
            },
        ],
    };

    const cities = {
        header: "Rent a car u Vašem gradu",
        details: "Jednim klikom odaberite grad u kojem ćete iznajmiti vozilo, i pregledajte mnogobrojan izbor vozila prilagođen vašim potrebama.",
        steps: [
            {
                id: "01",
                title: "Subotica",
                description:
                    "https://storage.googleapis.com/iznajmimeprobabucket/gradovi/Subotica.webp",
            },
            {
                id: "02",
                title: "Novi Sad",
                description:
                    "https://storage.googleapis.com/iznajmimeprobabucket/gradovi/Novi-Sad.webp",
            },
            {
                id: "03",
                title: "Beograd",
                description:
                    "https://storage.googleapis.com/iznajmimeprobabucket/gradovi/Beograd.webp",
            },
            {
                id: "04",
                title: "Zrenjanin",
                description:
                    "https://storage.googleapis.com/iznajmimeprobabucket/gradovi/Zrenjanin.webp",
            },
        ],
    }

    return (

        <Layout >
            <Helmet>
                <title>Iznajmi Auto u Srbiji | Rent a Car Serbia</title>
                <meta name="description" content="Iznajmi auto brzo i jednostavno širom Srbije! Povezujemo vas sa najboljim rent a car agencijama, nudeći širok izbor vozila po povoljnim cenama." data-react-helmet="true" />
            </Helmet>
            <Search />
            <SliderCarousel />
            <SectionComponent sectionData={cities} DynamicComponent={CityComponent} />
            <SectionComponent sectionData={sectionData} DynamicComponent={SectionItem} />
        </Layout>


    )
}