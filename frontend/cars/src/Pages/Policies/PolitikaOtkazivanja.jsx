import Layout from "../../Components/Layout/Layout"
import '../../style.scss'
export default function PolitikaOtkazivanja() {

    return (
        <Layout header={'Politika Otkazivanja'}>
            <div className="policies">
                <p>Ukoliko korisnik želi da otkaže rezervaciju, mora to učiniti najkasnije 48 sati pre početka najma.
                </p>
                <p>Ukoliko korisnik želi da promeni rezervaciju (na primer, da promeni vreme ili mesto preuzimanja), to mora učiniti najkasnije 48 sati pre početka najma.
                </p>
                <p>Ukoliko korisnik ne stigne na mesto preuzimanja vozila u dogovoreno vreme, rezervacija će biti otkazana.
                </p>
                <p>Ukoliko se korisnik ne pridržava ovog ugovora, web stranica ima pravo da odbije izdavanje iznajmljenog vozila bez povraćaja novca.
                </p>
            </div>
        </Layout>
    )

}