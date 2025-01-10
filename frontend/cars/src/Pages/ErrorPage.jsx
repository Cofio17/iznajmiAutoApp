import { Link } from 'react-router-dom'
import Header from '../Components/Header/Header'
export default function ErrorPage({ error }) {
    /**
     * Error page that renders if the searched URL is non existent
     */
    return (

        <div className=''>
            <Header />
            <main>
                <h1>Oops, this page doesnt <b>exist</b> Yet :&#40;</h1>
                <Link to='/'><b>Back to home Page</b></Link> <br />


                <h2>{error}</h2>
            </main>


        </div>


    )
}