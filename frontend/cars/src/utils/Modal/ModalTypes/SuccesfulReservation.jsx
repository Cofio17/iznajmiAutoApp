export default function SuccesfulReservation({ handleClose }) {
    return (
        <>
            <div className="heading">
                <h2>Čestitamo!</h2>
                <p>Vaša rezervacija je uspešno završena!</p>
            </div>
            <div className="main-content">
                <p>
                    Detalji vaše rezervacije su poslati na vašu email adresu.
                    Hvala što ste odabrali našu uslugu. Želimo vam ugodnu vožnju!
                </p>
                <p>Ako imate dodatna pitanja, slobodno nas kontaktirajte.</p>
                <button className='button' onClick={handleClose}>U redu</button>
            </div>
        </>

    )
}