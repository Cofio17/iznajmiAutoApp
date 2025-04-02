import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
//Pages
import App from './Pages/App.jsx'
import Car from './Pages/CarComponent.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import ReservationForm from './Pages/ReservationForm/ReservationForm.jsx'
import MyReservation from './Pages/MyReservation/MyReservation.jsx'
import ReservationDetails from './Pages/MyReservation/ReservationDetails.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import DashBoard from './Pages/Dashboard.jsx'
import policyRoutes from './Routes/PolicyRoutes.jsx'


//Context API
import { SearchProvider } from './Contexts/SearchContext.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'

//Utils
import ScrollToTop from './utils/ScrollToTop.jsx'
import ProtectedRoute from './Components/Layout/ProtectedRoute.jsx'

//loaders
import { fetchCars } from './loaders/fetchCars.js'

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
    path: "/rent-a-car",
    element: (
      <SearchProvider>
        <App />
      </SearchProvider>
    ),
    loader: fetchCars, // Loader za učitavanje podataka
  },
  {
    path: 'rent-a-car/car/:carId',
    element:
      <SearchProvider>
        <Car />
      </SearchProvider>,
    errorElement: <ErrorPage />
  },
  {
    path: '/reservation',
    element:
      <>
        <ScrollToTop />
        <ReservationForm />
      </>
  },
  {
    path: '/about_us',
    element: <>
      <ScrollToTop />
      <AboutUs />
    </>
  },
  {
    path: '/dashboard',
    element:
      <ProtectedRoute>
        <ScrollToTop />
        <DashBoard />
      </ProtectedRoute>
  },
  {
    path: '/moja-rezervacija',
    element: <MyReservation />,
    children: [{
      path: ':reservationId',
      element: <ReservationDetails />

    }
    ]
  },

  ...policyRoutes,




]);
createRoot(document.getElementById('root')).render(


  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,


)
