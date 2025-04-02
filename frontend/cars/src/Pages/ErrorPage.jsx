import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import Layout from '../Components/Layout/Layout'
export default function ErrorPage({ error }) {
    /**
     * Error page that renders if the searched URL is non existent
     */
    return (

        <Layout>
            <div className="errorPageWrapper">
                <h2>Stranica u izradi</h2>
                <FontAwesomeIcon size='3xl' icon={faWrench} color='#2D6A4F' />
                <Link href="/">Klikni za <span className='primary-color underline'>Povratak na sigurno</span> </Link>
            </div>
        </Layout>





    )
}