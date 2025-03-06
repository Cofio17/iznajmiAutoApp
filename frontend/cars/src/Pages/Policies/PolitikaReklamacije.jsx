import Layout from "../../Components/Layout/Layout"
import '../../style.scss'
export default function PolitikaReklamacije() {

    return (
        <Layout header={'Politika Reklamacije'}>
            <div className="policies">
                <p>Ukoliko korisnik primeti bilo kakve probleme ili štete na iznajmljenom vozilu prilikom preuzimanja, mora to odmah da prijavi kontakt telefonu rezervacije, ili slanjem e-pošte navedenoj na iznajmi.me.
                </p>
                {/* <p>Ukoliko korisnik primeti bilo kakve probleme ili štete na iznajmljenom vozilu tokom korišćenja, mora to odmah da prijavi najbližem predstavniku firme za iznajmljivanje ili putem kontakt forme na web stranici. To bi moglo uključivati, ali nije ograničeno na: probleme sa mehanikom, vanjskim ili unutrašnjim štetama na vozilu, neispravnosti u opremi ili bilo koje druge probleme koji bi mogli uticati na korisnikovu sigurnost ili komfor tokom korišćenja vozila.
                </p> */}
                <p>Agencija za iznajmljivanje će proveriti reklamaciju i obavestiti korisnika o ishodu u najkraćem mogućem roku. Agencija će pregledati vozilo i utvrditi da li su pritužbe validne. Ukoliko se utvrdi da su pritužbe opravdane, firma će preduzeti odgovarajuće mere kako bi rešila problem. To može uključivati zamenu vozila, popravku ili bilo koji drugi korak koji se smatra potrebnim da se problem reši.
                </p>
                <p>Ukoliko se utvrdi da je reklamacija opravdana, agencija za iznajmljivanje će preuzeti odgovornost za štetu, ako je ta šteta nastala kao posledica neispravnosti.
                </p>
                <p>
                    Ukoliko se utvrdi da je reklamacija neutemeljena, agencija za iznajmljivanje će obavestiti korisnika o razlozima zašto se tako odlučilo. Firma će korisniku pružiti objašnjenje i dokaze zašto se smatra da je reklamacija neutemeljena.
                </p>

            </div>
        </Layout>
    )

}