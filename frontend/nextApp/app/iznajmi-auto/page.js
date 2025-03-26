import HeroHeader from "@/components/HeroHeader/HeroHeader"
import SliderCarousel from "@/components/Slider/SliderCarousel"
import SectionComponent from "@/components/HomeSections/SectionComponent";
import homePageDataJson from '@/data/homePageDataJson.json'

const sectionData = homePageDataJson.sectionData;
const sectionZanimljivosti = homePageDataJson.sectionZanimljivosti;


export default function RentACar() {
    return (
        <>
            <HeroHeader header="Iznajmi Idealan Auto u Subotici" subtext="Pronađi najbolje ponude pouzdanih agencija" />
            <SliderCarousel />
            <SectionComponent sectionData={sectionData} />
            <SectionComponent sectionData={sectionZanimljivosti} />
            <SectionComponent sectionData={sectionZanimljivosti} />


        </>
    );
}