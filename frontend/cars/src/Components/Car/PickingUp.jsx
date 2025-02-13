export default function PickingUp({ header }) {

    return (
        <div className="container-car-data picking-up">
            <h3>{header}</h3>

            <div className="content">
                <p>Kako bismo osigurali da proces preuzimanja vozila prođe što jednostavnije i bez stresa, molimo vas da obratite pažnju na sledeće:</p>
                <div>
                    <h4>  Dokumentacija:</h4>
                    <p>
                        Obavezno ponesite važeću ličnu kartu ili pasoš, kao i vozačku dozvolu odgovarajuće kategorije. Bez ovih dokumenata, preuzimanje vozila neće biti moguće.
                    </p>
                </div>
                <div>
                    <h4>    Potvrda rezervacije:</h4>
                    <p>
                        Pripremite broj vaše rezervacije ili potvrdni email. Ovo će ubrzati proces preuzimanja.

                    </p>
                </div>
                <div>
                    <h4>    Plaćanje i depozit:</h4>
                    <p>
                        Ukoliko plaćanje vršite na licu mesta, osigurajte da imate dovoljno sredstava. Ako je depozit potreban, sredstva će biti blokirana na vašoj kartici i oslobođena nakon povratka vozila u dogovorenom stanju.
                    </p>

                </div>

            </div>
        </div>
    )
}