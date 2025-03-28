import HeroHeader from "@/components/HeroHeader/HeroHeader";
import SliderCarousel from "@/components/Slider/SliderCarousel";
import SectionComponent from "@/components/HomeSections/SectionComponent";
import homePageDataJson from '@/data/homePageDataJson'
import SectionButtons from "@/components/HomeSections/SectionButtons";
import CarSlider from "@/components/CarSlider/CarSlider";
import SectionComponentWrapper from "@/components/HomeSections/SectionComponentWrapper";
import { fetchCars } from '@/lib/fetchCars.js'



const sectionData = homePageDataJson.sectionData;
const sectionZanimljivosti = homePageDataJson.sectionZanimljivosti;

const buttonDataReservation = {
    header: "Iznajmi auto u Subotici odmah!",
    buttonText: "Pretraži vozila",
    id: "search-cars-button",
    to: 'https://iznajmi.me/rent-a-car?City=Subotica'
}

const buttonDataBlog = {
    header: "Saznaj više o Subotici u našem blogu!",
    buttonText: "Pritisni ovde!",
    id: "goToBlogButton",
    to: '/blog'
}

const carTypes = [
    {
        naziv: "Mini",
        image: "/Limuzina-04.webp",
    },
    {
        naziv: "Kompaktan",
        image: "/Limuzina-03.webp",
    },
    {
        naziv: "SUV",
        image: "/Limuzina-06.webp",
    },
    {
        naziv: "Porodičan",
        image: "/Limuzina-05.webp",
    },
    {
        naziv: "Limuzina",
        image: "/Limuzina-01.webp",
    },
    {
        naziv: "Premium",
        image: "/Limuzina-02.webp",
    },
];

export const metadata = {
    title: "Rent a Car Subotica | Iznajmljivanje Automobila Subotica",
    description: "Rent a Car Subotica – Jeftino, lako i brzo iznajmljivanje kola. Najbolje cene, bez skrivenih troškova! Rezervišite auto danas i uživajte u vožnji.",
    alternates: {
        canonical: "https://iznajmi.me/iznajmi-auto"
    }
}

export default async function RentACar() {
    const cars = await fetchCars();

    return (
        <>
            <HeroHeader header="Iznajmi Idealan Auto u Subotici" subtext="Pronađi najbolje ponude pouzdanih agencija" />
            <SliderCarousel carTypes={carTypes} />
            <SectionComponent sectionData={sectionData} />
            <CarSlider cars={Array.from(cars).slice(0, 5)} sectionData={{ header: "Najbolje Rent a Car Ponude u Subotici" }} />
            <SectionComponentWrapper sectionData={sectionZanimljivosti} />
            <SectionButtons buttonData={buttonDataBlog} line={false} />
            <SectionButtons buttonData={buttonDataReservation} />
        </>
    );
}