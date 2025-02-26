import PolitikaPrivatnosti from "../Pages/Policies/PolitikaPrivatnosti"
import PolitikaReklamacije from "../Pages/Policies/PolitikaReklamacije"
import PolitikaOtkazivanja from "../Pages/Policies/PolitikaOtkazivanja"

import UsloviRezervacije from "../Pages/Terms/UsloviRezervacije"
import UsloviRegistracije from "../Pages/Terms/UsloviRegistracije"
import UsloviPlacanja from "../Pages/Terms/UsloviPlacanja"
import Odgovornost from "../Pages/Terms/Odgovornost"

const policyRoutes = [
    {
        path: '/politika-privatnosti',
        element: <PolitikaPrivatnosti />
    },
    {
        path: '/politika-reklamacije',
        element: <PolitikaReklamacije />
    },
    {
        path: '/politika-otkazivanja',
        element: <PolitikaOtkazivanja />
    },

    {
        path: '/uslovi-rezervacije',
        element: <UsloviRezervacije />
    },
    {
        path: '/uslovi-registracije',
        element: <UsloviRegistracije />
    },
    {
        path: '/uslovi-placanja',
        element: <UsloviPlacanja />
    },
    {
        path: '/odgovornost',
        element: <Odgovornost />
    },
]

export default policyRoutes