import SectionItem from "./SectionItem"

export default function SectionComponent({ sectionData, DynamicComponent }) {




    return (

        <section className="section-container">

            <div className="section-container-h1-p">
                <h1>{sectionData.header}</h1>
                <p>{sectionData.details}</p>
            </div>

            <div className="section-container-items">



                {sectionData.steps.map((step) => (
                    // Dinamički renderuje prosleđenu komponentu za svaki korak
                    <DynamicComponent key={step.id} itemData={step} />
                ))}
            </div>
        </section>
    )

}