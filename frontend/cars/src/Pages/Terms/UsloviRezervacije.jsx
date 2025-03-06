import Layout from "../../Components/Layout/Layout";
export default function UsloviRezervacije() {

    return (
        <Layout header={'Uslovi Rezervacije'}>
            <div className="policies">
                <p>Korisnik se obavezuje da će proveriti tačnost svih unetih informacija pre potvrđivanja rezervacije.
                </p>
                <p>
                    Ukoliko korisnik želi da promeni ili otkaže rezervaciju, mora to da uradi na stranici na koju dolazi klikom na zeleno polje u gornjem desnom uglu ,,Proveri Rezervaciju.
                </p>
                <p>Ukoliko korisnik ne stigne na mesto preuzimanja vozila u dogovoreno vreme, rezervacija će biti otkazana.</p>
                <p>Rezervacijom, korisnik se slaže da će poštovati sve propise i zakone koji se odnose na korišćenje iznajmljenog vozila.</p>
                <p>Ukoliko korisnik ne poštuje ovaj dogovor, agencija ima pravo da odbije da izda rezervisano vozilo.
                </p>
                <p>Rezervacijom, korisnik prihvata sve uslove korišćenja web stranice.</p>
            </div>

            <div className="policies">
                <h2>Uslovi korišćenja web stranice za firme za iznajmljivanje vozila</h2>
                <p>Registracija na našoj web stranici zahteva ispunjavanje obaveznih polja sa podacima o firmi, kao što su ime i prezime vozača, PIB, broj telefona i email adresa.</p>
                <p>Agencija se obavezuje da će ponuditi istinite i tačne informacije o svojim vozilima za iznajmljivanje.</p>
                <p>Agencija se obavezuje da će poštovati sve propise i zakone koji se odnose na iznajmljivanje vozila.</p>
                <p>Agencija se obavezuje da će odgovarati za sve štete koje bi korisnici mogli naneti iznajmljenim vozilima.</p>
                <p>Ukoliko agencija ne poštuje ovaj dogovor, web stranica ima pravo da obustavi njen nalog bez prethodnog obaveštenja.</p>
                <p>Ukoliko firma ne poštuje ovaj dogovor, web stranica ima pravo da obustavi njen nalog bez prethodnog obaveštenja.</p>

                <h2>Uslovi korišćenja web stranice za posetioce koji žele da iznajme vozilo</h2>
                <p>Korišćenjem naše web stranice, korisnik se obavezuje da će poštovati sve propise i zakone koji se odnose na korišćenje iznajmljenog vozila.</p>
                <p>Korisnik se obavezuje da će plaćati sve naknade za korišćenje iznajmljenog vozila u skladu sa utvrđenim cenama.</p>
                <p>Korisnik se obavezuje da će održavati rentirano vozilo u dobrom stanju i da će ga vratiti u istom stanju u kom ga je preuzeo.</p>
            </div>
        </Layout>
    )
}