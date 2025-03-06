import Layout from "../../Components/Layout/Layout"
import '../../style.scss'
export default function PolitikaOtkazivanja() {

    return (
        <Layout header={'Politika Otkazivanja'}>
            <div className="policies footer-gap">
                <p>Ukoliko korisnik želi da otkaže rezervaciju, mora to učiniti najkasnije 48 sati pre početka najma.
                </p>
                <p>Ukoliko korisnik želi da promeni rezervaciju (na primer, da promeni vreme ili vozilo), to mora učiniti najkasnije 72 sata pre početka najma pozivom na kontakt telefon.
                </p>
                <p>Ukoliko korisnik ne stigne na mesto preuzimanja vozila u dogovoreno vreme, rezervacija će biti otkazana.
                </p>

            </div>
        </Layout>
    )

}