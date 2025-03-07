import '../style.scss'
import SectionComponent from '../Components/HomeSections/SectionComponent'
import CityComponent from '../Components/CityComponent/CityComponent'
import SectionItem from '../Components/HomeSections/SectionItem'
import { faComputerMouse, faKey, faBookmark } from '@fortawesome/free-solid-svg-icons'
import Search from '../Components/SearchPageComponents/Search';
import { useEffect } from 'react';
import SliderCarousel from '../Components/Slider/SliderCarousel'
import Layout from '../Components/Layout/Layout'

export default function HomePage() {

    useEffect(() => {
        document.title = 'Iznajmi me - Pocetna'
    })

    const sectionData = {
        header: "Kako iznajmiti auto u 3 koraka?",
        details: "Jednostavno pronađete željeno vozilo, rezervišete i preuzmete",
        steps: [

            {
                id: "01",
                title: "Pronađite",
                description:
                    " Prosto kliknite na 'Rent a car', podesite filtere i pronađite vozilo koje vam najviše odgovara.",
                icon: faComputerMouse
            },
            {
                id: "02",
                title: "Rezervišite",
                description:
                    "Nakon odabira datuma i provere da vozilo ispunjava vaše potrebe, kliknite na 'Rezerviši' i unesite svoje podatke. Ubrzo ćete dobiti e-mail sa potvrdom.",
                icon: faBookmark
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
        header: "Pronađite vozilo u željenom gradu",
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
            <Search />
            <SliderCarousel />
            <SectionComponent sectionData={cities} DynamicComponent={CityComponent} />
            <SectionComponent sectionData={sectionData} DynamicComponent={SectionItem} />
        </Layout>
    )
}