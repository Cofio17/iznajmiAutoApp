export default function SuccesfulReservation({ handleClose }) {
    return (
        <>
            <div className="heading">
                <h2>Čestitamo!</h2>
                <p>Vaša rezervacija je uspešno završena!</p>
            </div>
            <div className="main-content">
                <p>
                    Detalji rezervacije su poslati na Vasu email adresu.
                </p>
                <p>Hvala sto ste odabrali iznajmi.me</p>
                <p>Srecan put!</p>
                <button id="uRedu" className='button' onClick={handleClose}>U redu</button>
            </div>
        </>

    )
}