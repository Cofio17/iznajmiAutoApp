import { Link } from 'react-router-dom'
export default function ErrorPage({ error }) {
    /**
     * Error page that renders if the searched URL is non existent
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