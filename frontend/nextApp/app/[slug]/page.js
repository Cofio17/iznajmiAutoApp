import CarSlider from '@/components/CarSlider/CarSlider';
import HeroHeader from '@/components/HeroHeader/HeroHeader';
import SectionButtons from '@/components/HomeSections/SectionButtons';
import SectionComponent from '@/components/HomeSections/SectionComponent';
import SectionComponentWrapper from '@/components/HomeSections/SectionComponentWrapper';
import SliderCarousel from '@/components/Slider/SliderCarousel';
import cities from '@/data/cities.json'
import { fetchCarsByCity } from '@/lib/fetchCars';

export default async function RentACarCity({ params }) {
    const prefix = process.env.prefix
    const carTypes = [
        {
            naziv: "Mini",
            image: `${prefix}/Limuzina-04.webp`,
        },
        {
            naziv: "Kompaktan",
            image: `${prefix}/Limuzina-03.webp`,
        },
        {
            naziv: "SUV",
            image: `${prefix}/Limuzina-06.webp`,
        },
        {
            naziv: "Porodičan",
            image: `${prefix}/Limuzina-05.webp`,
        },
        {
            naziv: "Limuzina",
            image: `${prefix}/Limuzina-01.webp`,
        },
        {
            naziv: "Premium",
            image: `${prefix}/Limuzina-02.webp`,
        },
    ];


    const { slug } = await params;
    const city = await cities.find(city => slug === city.slug);
    const CITY_NAME = city.name
    const filteredCars = await fetchCarsByCity(CITY_NAME);

    return (<>
        <HeroHeader cityProp={CITY_NAME} filteredCars={filteredCars} header={`Rent a car ${CITY_NAME}`} subtext="Pronađi najbolje ponude pouzdanih agencija" />
        <SliderCarousel cars={filteredCars} carTypes={carTypes} header={`Naša mreža vozila u ${city.nameVariation}`} />
        <SectionComponent sectionData={city.sectionData} />
        <CarSlider cars={filteredCars} sectionData={{ header: `Najbolje Rent a Car ponude u ${city.nameVariation}` }} />
        <SectionComponentWrapper sectionData={city.sectionZanimljivosti} />
        <SectionButtons buttonData={city.buttons.reservation} line={false} />
        <SectionButtons buttonData={city.buttons.blog} />
    </>
    )
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const city = await cities.find(city => slug === city.slug);

    if (!city) {
        return {
            title: "Rent a Car | Iznajmi auto širom Srbije",
            description: "Najam automobila u Srbiji. Brza i jednostavna rezervacija, bez skrivenih troškova.",
            alternates: {
                canonical: "https://iznajmi.me"
            },
            icons: {
                icon: "/favicon.ico",
                apple: "/favicon.ico"
            }
        };
    }

    return {
        title: `Rent a Car ${city.name} | Iznajmljivanje Automobila ${city.name}`,
        description: `Rent a Car ${city.name} | Jeftino, lako i brzo iznajmljivanje kola. Najbolje cene, bez skrivenih troškova! Rezervišite auto danas i uživajte u vožnji.`,
        keywords: [`rent a car ${city.name}`, `${city.name}`, `iznajmljivanje kola ${city.name}`, `${city.name} auto rental`],
        alternates: {
            canonical: `https://iznajmi.me/${city.slug}`
        },
        openGraph: {
            title: `Rent a Car ${city.name}`,
            description: `Najbolje cene za rent a car u ${city.name}. Brza online rezervacija i sigurna vozila.`,
            url: `https://iznajmi.me/${city.slug}`,
            siteName: 'Iznajmi.me',
            locale: 'sr_RS',
            type: 'website',
            images: [
                {
                    url: `https://storage.googleapis.com/iznajmime/cities/${city.name}.webp`,
                    width: 1200,
                    height: 630,
                    alt: `Rent a Car ${city.name}`
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: `Rent a Car ${city.name}`,
            description: `Iznajmi auto u ${city.name} za manje od 2 minuta!`,
            images: [`https://storage.googleapis.com/iznajmime/cities/${city.name}.webp`]
        },
        icons: {
            icon: "/favicon.ico",
            apple: "/favicon.ico"
        }
    };
}

export async function generateStaticParams() {
    return cities.map(city => ({
        slug: city.slug
    }))
}

