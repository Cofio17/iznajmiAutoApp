export default function SectionComponent({ sectionData, DynamicComponent }) {

    return (

        <section className="section-container">

            <div className="section-container-h1-p">
                <p style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <span className="darker-primary-color">Iznajmi.me</span> je platforma osnovana da resi jedan jednostavan problem, širok i nesiguran izbor iznajmljivanja vozila, nas cilj jeste da olaksamo ceo proces za sve, tako sto okupljamo sve proverene i pouzdane agencije na jedno mesto, bez da pretrazujete nepoznate sajtove pokusavajuci da nadjete rent a car agenciju kojoj mozete verovati
                </p>
                <div className="gold-line"></div>
                <h2>{sectionData.header}</h2>
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