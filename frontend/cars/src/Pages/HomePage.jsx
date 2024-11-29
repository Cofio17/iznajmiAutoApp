import '../style.scss'
import Header from '../Components/Header'
import SectionComponent from '../Components/SectionComponent'
import CityComponent from '../Components/cityComponent';
import SectionItem from '../Components/SectionItem';

export default function HomePage() {



    const sectionData = {
        header: "Iznajmite auto za svoje putovanje danas",
        details: "Pronađite, rezervišite i preuzmite vaš idealan rent-a-car vozilo, bez obzira na vašu lokaciju. Uz našu široku ponudu vozila, sigurni smo da ćete pronaći vozilo koje odgovara vašim potrebama.",
        steps: [
            {
                id: "01",
                title: "Pronađite vozilo",
                description:
                    "Pronađite vaš savršen rent-a-car uz samo nekoliko klikova. Filtrirajte po ceni, tipu vozila i drugim opcijama da biste pronašli vozilo koje vam najbolje odgovara.",
            },
            {
                id: "02",
                title: "Proverite recenzije",
                description:
                    "Proverite recenzije drugih putnika koji su koristili vozila na našoj platformi. Saznajte šta su drugi rekli o vozilima, kako se služba klijentima ponaša i kako je iskustvo iznajmljivanja vozila.",
            },
            {
                id: "03",
                title: "Rezervišite vozilo",
                description:
                    "Rezervišite vaše vozilo u samo nekoliko minuta. Upisujete datume i lokaciju preuzimanja, a mi ćemo vam prikazati dostupne opcije. Odaberite vozilo koje vam najviše odgovara i rezervišite ga danas.",
            },
        ],
    };

    const cities = {
        header: "Pronađite vozilo po kategoriji",
        details: "Naša platforma vam omogućava da lako pronađete vozilo koje vam najviše odgovara. Izaberite kategoriju vozila koja vam je potrebna i pregledajte ponude koje odgovaraju vašim zahtevima",
        steps: [
            {
                id: "01",
                title: "Subotica",
                description:
                    "/subotica.webp",
            },
            {
                id: "02",
                title: "Novi Sad",
                description:
                    "/novisad.jpg",
            },
            {
                id: "03",
                title: "Beograd",
                description:
                    "/beograd.jpg",
            },
            {
                id: "04",
                title: "Zrenjanin",
                description:
                    "/zrenjanin.jpg",
            },
        ],
    }






    return (<div className="container">
        <Header />
        <SectionComponent sectionData={cities} DynamicComponent={CityComponent} />
        <SectionComponent sectionData={sectionData} DynamicComponent={SectionItem} />
    </div>
    )
}