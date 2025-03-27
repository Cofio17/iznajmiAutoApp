import HeroHeader from "@/components/HeroHeader/HeroHeader";
import SliderCarousel from "@/components/Slider/SliderCarousel";
import SectionComponent from "@/components/HomeSections/SectionComponent";
import CarCardNew from "@/components/CarCardNew/CarCardNew";

import homePageDataJson from '@/data/homePageDataJson'
import SectionButtons from "@/components/HomeSections/SectionButtons";
import CarSlider from "@/components/CarSlider/CarSlider";
import SectionComponentWrapper from "@/components/HomeSections/SectionComponentWrapper";


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

const dummyCars = [
    {
        licensePlate: "ABC123",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        pricePerDay: 45,
        brand: "Toyota",
        model: "Corolla",
        transmission: "Manuel",
        fuelType: "Petrol",
        seats: 5,
        trunkCapacity: 2,
        pricePerDay: 50
    },
    {
        licensePlate: "XYZ789",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        pricePerDay: 60,
        brand: "Tesla",
        model: "Model 3",
        transmission: "Automatic",
        fuelType: "Electric",
        seats: 5,
        trunkCapacity: 1,
        pricePerDay: 50
    },
    {
        licensePlate: "DEF456",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        pricePerDay: 35,
        brand: "Volkswagen",
        model: "Golf",
        transmission: "Manuel",
        fuelType: "Petrol",
        seats: 5,
        trunkCapacity: 3,
        pricePerDay: 50
    }
];

const dummyCar = {
    licensePlate: "ABC123",
    image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
    brand: "Toyota",
    model: "Corolla",
    transmission: "Manuel",
    fuelType: "Petrol",
    seats: 5,
    trunkCapacity: 2,
    pricePerDay: 50
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

export default function RentACar() {
    return (
        <>
            <HeroHeader header="Iznajmi Idealan Auto u Subotici" subtext="Pronađi najbolje ponude pouzdanih agencija" />
            <SliderCarousel carTypes={carTypes} />
            <SectionComponent sectionData={sectionData} />
            <CarSlider />
            <SectionComponentWrapper sectionData={sectionZanimljivosti} />
            <SectionButtons buttonData={buttonDataBlog} line={false} />
            <SectionButtons buttonData={buttonDataReservation} />
        </>
    );
}