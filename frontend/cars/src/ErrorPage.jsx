import { Link } from 'react-router-dom'
export default function ErrorPage({ error }) {
    /**
     * u html oba izgleda kao <a>
     * Glavna razlika je sto ce element a da uradi refrech cele stranice
     * a Link koristi CSR i js i pomocu toga bez refresha radi kretanje
     */
    return (
        <div className=''>
            <h1>Oops, this page doesnt <b>exists</b></h1>
            <Link to='/'>Home from router</Link> <br />
            <a href="/">Home from a href</a>

            <h2>{error}</h2>

        </div>


    )
}