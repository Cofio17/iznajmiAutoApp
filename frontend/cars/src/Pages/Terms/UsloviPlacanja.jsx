import Layout from "../../Components/Layout/Layout";
export default function UsloviPlacanja() {

    return (
        <Layout header={'Uslovi Plaćanja'}>
            <div className="policies">
                <h2>Uslovi plaćanja</h2>
                <p>Plaćanje depozita ili cene iznajmljivanja je obavezno za potvrdu rezervacije.</p>
                <p>Plaćanje ostatka cene iznajmljivanja se vrši prilikom preuzimanja vozila.</p>
                <p>Dostupne metode plaćanja su: kreditna kartica, debitna kartica, elektronski novac i gotovina.</p>
                <p>Ukoliko korisnik ne plati cenu iznajmljivanja u roku, rezervacija će biti otkazana, a depozit neće biti vraćen.</p>
                <p>Ukoliko korisnik želi da proširi vreme iznajmljivanja, mora to da uradi najkasnije 24 sata pre kraja iznajmljivanja. Ukoliko to ne učini, biće naplaćen pun iznos za dodatni period.</p>
                <p>Ukoliko korisnik ne poštuje ovaj dogovor, web stranica ima pravo da odbije da izda rentirano vozilo bez povraćaja novca.</p>

            </div>
        </Layout>
    )
}