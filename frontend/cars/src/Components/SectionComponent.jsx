export default function SectionComponent({ sectionData, DynamicComponent }) {

    return (

        <section className="section-container">

            <div className="section-container-h1-p">
                <div className="gold-line"></div>
                <h1>{sectionData.header}</h1>
                <p>{sectionData.details}</p>
            </div>

            <div className="section-container-items">

                {sectionData.steps.map((step) => (
                    // dynamicly renderes component
                    <DynamicComponent key={step.id} itemData={step} />
                ))}
            </div>
        </section>
    )

}