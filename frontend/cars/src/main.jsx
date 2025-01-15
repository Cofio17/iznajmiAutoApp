import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/App.jsx'
import Car from './Pages/CarComponent.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import ReservationForm from './Pages/ReservationForm/ReservationForm.jsx'
import { SearchProvider } from './Contexts/SearchContext.jsx'
import ScrollToTop from './utils/ScrollToTop.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import PolitikaPrivatnosti from './Pages/Policies/PolitikaPrivatnosti.jsx'
import PolitikaReklamacije from './Pages/Policies/PolitikaReklamacije.jsx'
import PolitikaOtkazivanja from './Pages/Policies/PolitikaOtkazivanja.jsx'
import UsloviRezervacije from './Pages/Terms/UsloviRezervacije.jsx'
import UsloviRegistracije from './Pages/Terms/UsloviRegistracije.jsx'
import UsloviPlacanja from './Pages/Terms/UsloviPlacanja.jsx'
import Odgovornost from './Pages/Terms/Odgovornost.jsx'
//loaders
import { fetchCars } from './loaders/fetchCars.js'
//router imported
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Instancing router
const router = createBrowserRouter([

  {
    path: '/',
    element:
      <SearchProvider>
        <HomePage />
      </SearchProvider>,

    errorElement: <ErrorPage />,
  },
  {
    path: "/cars",
    element: (
      <SearchProvider>
        <ScrollToTop />
        <App />
      </SearchProvider>
    ),
    loader: fetchCars, // Loader za učitavanje podataka
  },
  {
    path: 'cars/car/:carId',
    element: <Car />,
    errorElement: <ErrorPage />
  },
  {
    path: '/reservation',
    element: <ReservationForm />
  },
  {
    path: '/about_us',
    element: <>
      <ScrollToTop />
      <AboutUs />
    </>
  },
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



]);
createRoot(document.getElementById('root')).render(


  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
