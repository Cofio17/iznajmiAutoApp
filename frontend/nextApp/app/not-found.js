import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'

export default function NotFound() {
    return (
        <div className="errorPageWrapper">
            <h2>Stranica u izradi</h2>
            <FontAwesomeIcon size='3xl' icon={faWrench} color='#2D6A4F' />
            <Link href="/">Klikni za <span className='primary-color underline'>Povratak na sigurno</span> </Link>
        </div>
    )
}