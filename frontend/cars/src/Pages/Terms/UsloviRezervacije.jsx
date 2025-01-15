import Layout from "../../Components/Layout/Layout";
export default function UsloviRezervacije() {

    return (
        <Layout header={'Uslovi Rezervacije'}>
            <div className="policies">
                <p>Korisnik se obavezuje da će proveriti tačnost svih unetih informacija pre potvrđivanja rezervacije.
                </p>
                <p>Ukoliko korisnik želi da promeni ili otkaze rezervaciju, mora to da uradi najkasnije 48 sati pre početka iznajmljivanja.
                </p>
                <p>Ukoliko korisnik ne stigne na mesto preuzimanja vozila u dogovoreno vreme, rezervacija će biti otkazana.</p>
                <p>Rezervacijom, korisnik se slaže da će poštovati sve propise i zakone koji se odnose na korišćenje rentiranog vozila.</p>
                <p>Ukoliko korisnik ne poštuje ovaj dogovor, web stranica ima pravo da odbije da izda rentirano vozilo.</p>
                <p>Rezervacijom, korisnik prihvata sve uslove korišćenja web stranice.</p>
            </div>
        </Layout>
    )
}